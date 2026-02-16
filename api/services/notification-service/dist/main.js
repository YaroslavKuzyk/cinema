"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('NotificationService');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const kafkaBrokers = configService.get('KAFKA_BROKERS', 'localhost:9092').split(',');
    const kafkaClientId = configService.get('KAFKA_CLIENT_ID', 'notification-service');
    const kafkaGroupId = configService.get('KAFKA_GROUP_ID', 'notification-service-group');
    app.connectMicroservice({
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
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cinema Notification Service')
        .setDescription('Notification microservice API for email and push notifications')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.use('/openapi.json', (req, res) => {
        res.json(document);
    });
    app.use('/api', (req, res) => {
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
    await app.startAllMicroservices();
    logger.log(`Kafka consumer started with group: ${kafkaGroupId}`);
    logger.log(`Connected to Kafka brokers: ${kafkaBrokers.join(', ')}`);
    const port = configService.get('API_PORT', 8002);
    await app.listen(port);
    logger.log(`Notification Service is running on port ${port}`);
    logger.log(`API Documentation available at http://localhost:${port}/api`);
}
void bootstrap();
//# sourceMappingURL=main.js.map