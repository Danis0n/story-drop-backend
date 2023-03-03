import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PostServiceProto } from '../../common';
import { AuthModule } from '../auth/auth.module';
import {
  ChapterController,
  CharacterController,
  CollectionController,
  FandomController,
  GenreController,
  ParingController,
  PostController,
  TagController,
} from './controllers';
import { UserModule } from '../user/user.module';
import { PostService } from './post.service';

@Module({
  imports: [ClientsModule.register([PostServiceProto]), AuthModule, UserModule],
  controllers: [
    PostController,
    FandomController,
    CharacterController,
    CollectionController,
    TagController,
    ParingController,
    GenreController,
    ChapterController,
  ],
  providers: [PostService],
})
export class PostModule {}
