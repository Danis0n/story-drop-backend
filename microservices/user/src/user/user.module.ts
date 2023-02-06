import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMapper } from '../common/mapper/user.mapper';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../common/repository/user.repository';

@Module({
  providers: [UserService, UserMapper, UserRepository, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
