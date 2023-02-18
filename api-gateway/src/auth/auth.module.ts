import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '@nestjs/microservices';
import { AuthServiceProto } from '../config';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    ClientsModule.register([AuthServiceProto]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
