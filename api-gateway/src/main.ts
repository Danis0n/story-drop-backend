import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function run() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const PORT: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
run();
