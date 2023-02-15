import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { userServiceProto } from '../common';
import { AdminService } from './admin.service';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [ClientsModule.register([userServiceProto])],
})
export class AdminModule {}
