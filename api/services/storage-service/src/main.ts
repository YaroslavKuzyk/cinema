import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cinema Storage Service')
    .setDescription('Storage microservice API for file management with S3')
    .setVersion('1.0')
    .addBearerAuth()
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
  <title>Cinema Storage Service - API</title>
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

  const port = configService.getOrThrow<number>('API_PORT');
  await app.listen(port);

  console.log(`Storage Service is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api`);
}

void bootstrap();
