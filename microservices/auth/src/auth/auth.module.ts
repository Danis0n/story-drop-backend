import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { userServiceProto } from '../config';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceRepository, SessionRepository } from '../common';

@Module({
  providers: [AuthService, PrismaService, SessionRepository, DeviceRepository],
  controllers: [AuthController],
  imports: [ClientsModule.register([userServiceProto])],
})
export class AuthModule {}
