import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
