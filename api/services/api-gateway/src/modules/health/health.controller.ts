import { Controller, Get, Inject, HttpStatus, HttpException, OnModuleInit } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiServiceUnavailableResponse } from '@nestjs/swagger';
import { ClientKafka } from '@nestjs/microservices';

interface ServiceHealth {
  name: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  error?: string;
}

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  gateway: string;
  kafka: ServiceHealth;
}

@ApiTags('Health')
@Controller('health')
export class HealthController implements OnModuleInit {
  private kafkaConnected = false;

  constructor(
    @Inject('IDENTITY_SERVICE') private readonly identityClient: ClientKafka,
  ) {}

  async onModuleInit() {
    try {
      await this.identityClient.connect();
      this.kafkaConnected = true;
    } catch {
      this.kafkaConnected = false;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Check API Gateway health' })
  @ApiOkResponse({
    description: 'Health check passed',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
        timestamp: { type: 'string', format: 'date-time' },
        gateway: { type: 'string' },
        kafka: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            status: { type: 'string', enum: ['healthy', 'unhealthy', 'unknown'] },
            error: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiServiceUnavailableResponse({ description: 'Gateway is unhealthy' })
  async check(): Promise<HealthResponse> {
    const kafkaHealth: ServiceHealth = {
      name: 'kafka',
      status: this.kafkaConnected ? 'healthy' : 'unhealthy',
      error: this.kafkaConnected ? undefined : 'Kafka not connected',
    };

    const overallStatus = this.kafkaConnected ? 'healthy' : 'degraded';

    const response: HealthResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      gateway: 'healthy',
      kafka: kafkaHealth,
    };

    return response;
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe - checks if the gateway is running' })
  @ApiOkResponse({ description: 'Gateway is alive' })
  async liveness(): Promise<{ status: string }> {
    return { status: 'ok' };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe - checks if the gateway is ready' })
  @ApiOkResponse({ description: 'Gateway is ready' })
  @ApiServiceUnavailableResponse({ description: 'Gateway is not ready' })
  async readiness(): Promise<{ status: string; kafka: boolean }> {
    if (!this.kafkaConnected) {
      throw new HttpException(
        { status: 'not ready', reason: 'Kafka not connected' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return { status: 'ready', kafka: true };
  }
}
