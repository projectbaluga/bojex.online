import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads'), {
    prefix: '/uploads',
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
