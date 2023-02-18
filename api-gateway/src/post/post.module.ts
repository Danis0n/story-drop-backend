import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ClientsModule } from '@nestjs/microservices';
import { PostServiceProto } from '../config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ClientsModule.register([PostServiceProto]), AuthModule],
  controllers: [PostController],
})
export class PostModule {}
