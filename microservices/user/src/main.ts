import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice } from '@nestjs/common';
import { userServiceProto } from './config/proto.config';

async function run() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    userServiceProto,
  );
  await app.listen();
}
run();
