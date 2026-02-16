"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
    app.enableCors({
        origin: [frontendUrl, 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    });
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cinema API Gateway')
        .setDescription('API Gateway for Cinema platform - proxies requests to identity-service and storage-service')
        .setVersion('1.0')
        .addBearerAuth()
        .addCookieAuth('refreshToken')
        .addServer(`http://localhost:${process.env.API_PORT || 3000}`, 'Local')
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
  <title>Cinema API Gateway</title>
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
    const port = process.env.API_PORT || 3000;
    await app.listen(port);
    logger.log(`API Gateway is running on http://localhost:${port}`);
    logger.log(`API Documentation available at http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map