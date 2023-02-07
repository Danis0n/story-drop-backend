import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authServiceProto } from './config';
import { INestMicroservice } from '@nestjs/common';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    authServiceProto,
  );
  await app.listen();
}
bootstrap();
