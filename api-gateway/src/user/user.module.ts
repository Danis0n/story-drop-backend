import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { UserServiceProto } from '../common';

@Module({
  imports: [ClientsModule.register([UserServiceProto]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
