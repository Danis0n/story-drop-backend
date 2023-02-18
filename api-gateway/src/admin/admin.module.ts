import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AdminServiceProto } from '../config';

@Module({
  imports: [ClientsModule.register([AdminServiceProto])],
  controllers: [AdminController],
})
export class AdminModule {}
