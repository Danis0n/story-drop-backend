import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ImageMapper, UserMapper, UserRepository } from '../common';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    UserService,
    UserRepository,
    UserMapper,
    ImageMapper,
    PrismaService,
  ],
  controllers: [UserController],
})
export class UserModule {}
