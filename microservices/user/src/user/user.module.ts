import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ImageMapper, UserMapper } from '../common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../common';

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
