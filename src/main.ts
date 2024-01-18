import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('NestJS API boilerplate')
    .setDescription('A NestJS API boilerplate')
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);
  const APP_ORIGIN = configService.get('APP_ORIGIN');
  app.enableCors({ origin: APP_ORIGIN });
  const PORT = configService.get('APP_PORT');
  const URL = configService.get('APP_URL');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  Logger.log(`Swagger docs running on ${URL}:${PORT}/docs`, 'Bootstrap');

  await app.listen(PORT, () => {
    Logger.log(`Listening on port ${PORT}`, 'Bootstrap');
  });
}
bootstrap();
