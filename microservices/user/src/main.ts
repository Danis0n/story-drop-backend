import { AppModule } from './app.module';
import { userServiceProto } from './config';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function run() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    userServiceProto,
  );
  await app.listen();
}
run();
