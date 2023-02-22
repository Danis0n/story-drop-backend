import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PostServiceProto } from '../common';
import { AuthModule } from '../auth/auth.module';
import {
  CharacterController,
  CollectionController,
  FandomController,
  GenreController,
  ParingController,
  PostController,
  TagController,
} from './controllers';

@Module({
  imports: [ClientsModule.register([PostServiceProto]), AuthModule],
  controllers: [
    PostController,
    FandomController,
    CharacterController,
    CollectionController,
    TagController,
    ParingController,
    GenreController,
  ],
})
export class PostModule {}
