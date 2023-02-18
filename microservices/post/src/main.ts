import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice } from '@nestjs/common';
import { postServiceProto } from './config';

async function run() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    postServiceProto,
  );
  await app.listen();
}
run();
