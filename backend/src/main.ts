import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  const config = app.get(ConfigService);
  await app.listen(config.get('port') || 3000);
}
bootstrap();
