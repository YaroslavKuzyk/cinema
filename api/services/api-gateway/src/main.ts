import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const frontendUrl = process.env.FRONTEND_URL;

  app.enableCors({
    origin: [frontendUrl],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Cinema API Gateway')
    .setDescription(
      'API Gateway for Cinema platform - proxies requests to identity-service and storage-service',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .addServer(`http://localhost:${process.env.API_GATEWAY_PORT}`, 'Local')
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

  const port = process.env.API_GATEWAY_PORT!;
  await app.listen(port);

  logger.log(`API Gateway is running on http://localhost:${port}`);
  logger.log(`API Documentation available at http://localhost:${port}/api`);
}

bootstrap();
