import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiServiceUnavailableResponse } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { of } from 'rxjs';

interface ServiceHealth {
  name: string;
  status: 'healthy' | 'unhealthy';
  responseTime?: number;
  error?: string;
}

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: ServiceHealth[];
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Check API Gateway and downstream services health' })
  @ApiOkResponse({
    description: 'Health check passed',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
        timestamp: { type: 'string', format: 'date-time' },
        services: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              status: { type: 'string', enum: ['healthy', 'unhealthy'] },
              responseTime: { type: 'number' },
              error: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiServiceUnavailableResponse({ description: 'One or more services are unhealthy' })
  async check(): Promise<HealthResponse> {
    const services = await Promise.all([
      this.checkService('identity-service', this.configService.get<string>('IDENTITY_SERVICE_URL')),
      this.checkService('storage-service', this.configService.get<string>('STORAGE_SERVICE_URL')),
    ]);

    const healthyCount = services.filter((s) => s.status === 'healthy').length;
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy';

    if (healthyCount === services.length) {
      overallStatus = 'healthy';
    } else if (healthyCount > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'unhealthy';
    }

    const response: HealthResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      services,
    };

    if (overallStatus === 'unhealthy') {
      throw new HttpException(response, HttpStatus.SERVICE_UNAVAILABLE);
    }

    return response;
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe - checks if the gateway is running' })
  @ApiOkResponse({ description: 'Gateway is alive' })
  async liveness(): Promise<{ status: string }> {
    return { status: 'ok' };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe - checks if the gateway is ready to accept traffic' })
  @ApiOkResponse({ description: 'Gateway is ready' })
  @ApiServiceUnavailableResponse({ description: 'Gateway is not ready' })
  async readiness(): Promise<{ status: string }> {
    const identityUrl = this.configService.get<string>('IDENTITY_SERVICE_URL');
    const storageUrl = this.configService.get<string>('STORAGE_SERVICE_URL');

    if (!identityUrl || !storageUrl) {
      throw new HttpException(
        { status: 'not ready', reason: 'Missing service URLs configuration' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return { status: 'ready' };
  }

  private async checkService(name: string, baseUrl: string | undefined): Promise<ServiceHealth> {
    if (!baseUrl) {
      return {
        name,
        status: 'unhealthy',
        error: 'Service URL not configured',
      };
    }

    const startTime = Date.now();

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${baseUrl}/health`).pipe(
          timeout(5000),
          catchError((error) => {
            return of({ error });
          }),
        ),
      );

      if ('error' in response) {
        const error = response.error as Error & { code?: string; message?: string };
        return {
          name,
          status: 'unhealthy',
          responseTime: Date.now() - startTime,
          error: error.code || error.message || 'Connection failed',
        };
      }

      return {
        name,
        status: 'healthy',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error & { code?: string };
      return {
        name,
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        error: err.code || err.message || 'Unknown error',
      };
    }
  }
}
