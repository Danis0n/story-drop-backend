import { AppModule } from './app.module';
import { sessionSettings } from './common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function run() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const PORT: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: config.get<string>('FRONTEND_URL'),
    credentials: true,
  });

  app.use(session(sessionSettings));
  app.use(cookieParser());

  await app.listen(PORT);
}

run();
