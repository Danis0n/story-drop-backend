import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { userServiceProto } from '../config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [ClientsModule.register([userServiceProto])],
})
export class AuthModule {}
