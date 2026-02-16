import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaProxyService } from './kafka-proxy.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'IDENTITY_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get(
                'KAFKA_CLIENT_ID',
                'api-gateway-identity',
              ),
              brokers: configService
                .get('KAFKA_BROKERS', 'localhost:9092')
                .split(','),
            },
            consumer: {
              groupId: configService.get(
                'KAFKA_IDENTITY_GROUP_ID',
                'api-gateway-identity-group',
              ),
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'STORAGE_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get(
                'KAFKA_CLIENT_ID',
                'api-gateway-storage',
              ),
              brokers: configService
                .get('KAFKA_BROKERS', 'localhost:9092')
                .split(','),
            },
            consumer: {
              groupId: configService.get(
                'KAFKA_STORAGE_GROUP_ID',
                'api-gateway-storage-group',
              ),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [KafkaProxyService],
  exports: [ClientsModule, KafkaProxyService],
})
export class KafkaClientModule {}
