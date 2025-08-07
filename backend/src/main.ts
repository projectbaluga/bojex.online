import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: process.env.CORS_ORIGIN || '*' });
  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  app.useStaticAssets(join(__dirname, '..', uploadDir));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
