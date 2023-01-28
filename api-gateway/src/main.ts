import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import { sessionSettings } from './utils/config/config';

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
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}
run();
