"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('StorageService');
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const configService = appContext.get(config_1.ConfigService);
    const kafkaBrokers = configService
        .get('KAFKA_BROKERS', 'localhost:9092')
        .split(',');
    const kafkaClientId = configService.get('KAFKA_CLIENT_ID', 'storage-service');
    const kafkaGroupId = configService.get('KAFKA_GROUP_ID', 'storage-service-group');
    await appContext.close();
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    await app.listen();
    logger.log('Storage Service Kafka Microservice is running');
    logger.log(`Client ID: ${kafkaClientId}`);
    logger.log(`Group ID: ${kafkaGroupId}`);
    logger.log(`Brokers: ${kafkaBrokers.join(', ')}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map