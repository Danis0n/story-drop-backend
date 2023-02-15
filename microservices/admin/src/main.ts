import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { adminServiceProto } from './common';
import { INestMicroservice } from '@nestjs/common';

async function run() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    adminServiceProto,
  );
  await app.listen();
}
run();
