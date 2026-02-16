import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NotificationService');

  // Create hybrid application (HTTP + Kafka microservice)
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Configure Kafka microservice
  const kafkaBrokers = configService.get('KAFKA_BROKERS', 'localhost:9092').split(',');
  const kafkaClientId = configService.get('KAFKA_CLIENT_ID', 'notification-service');
  const kafkaGroupId = configService.get('KAFKA_GROUP_ID', 'notification-service-group');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaClientId,
        brokers: kafkaBrokers,
      },
      consumer: {
        groupId: kafkaGroupId,
      },
    },
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cinema Notification Service')
    .setDescription('Notification microservice API for email and push notifications')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve OpenAPI JSON
  app.use('/openapi.json', (req: any, res: any) => {
    res.json(document);
  });

  // Stoplight Elements UI
  app.use('/api', (req: any, res: any) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cinema Notification Service - API</title>
  <style>
    html, body { margin: 0; padding: 0; height: 100%; }
    elements-api { display: block; height: 100%; }
  </style>
</head>
<body>
  <elements-api
    id="docs"
    apiDescriptionUrl="/openapi.json"
    router="hash"
    layout="sidebar"
  />
  <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
</body>
</html>
    `);
  });

  // Start all microservices
  await app.startAllMicroservices();
  logger.log(`Kafka consumer started with group: ${kafkaGroupId}`);
  logger.log(`Connected to Kafka brokers: ${kafkaBrokers.join(', ')}`);

  // Start HTTP server for health checks
  const port = configService.get<number>('API_PORT', 8002);
  await app.listen(port);

  logger.log(`Notification Service is running on port ${port}`);
  logger.log(`API Documentation available at http://localhost:${port}/api`);
}

void bootstrap();
