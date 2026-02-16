import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('StorageService');

  // Create application context to access ConfigService
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const kafkaBrokers = configService
    .get('KAFKA_BROKERS', 'localhost:9092')
    .split(',');
  const kafkaClientId = configService.get('KAFKA_CLIENT_ID', 'storage-service');
  const kafkaGroupId = configService.get(
    'KAFKA_GROUP_ID',
    'storage-service-group',
  );

  await appContext.close();

  // Create Kafka microservice
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen();

  logger.log('Storage Service Kafka Microservice is running');
  logger.log(`Client ID: ${kafkaClientId}`);
  logger.log(`Group ID: ${kafkaGroupId}`);
  logger.log(`Brokers: ${kafkaBrokers.join(', ')}`);
}

void bootstrap();
