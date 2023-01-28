import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { UserServiceProto } from '../utils/config/config';

@Module({
  imports: [ClientsModule.register([UserServiceProto])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
