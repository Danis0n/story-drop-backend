import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostMapper, PostRepository } from '../../common';
import { TagModule } from '../tag/tag.module';
import { ParingModule } from '../paring/paring.module';
import { GenreModule } from '../genre/genre.module';
import { FandomModule } from '../fandom/fandom.module';
import { CollectionModule } from '../collection/collection.module';
import { CharacterModule } from '../character/character.module';
import { ChapterModule } from '../chapter/chapter.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TagModule,
    ParingModule,
    GenreModule,
    FandomModule,
    CollectionModule,
    CharacterModule,
    ChapterModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostMapper, PostRepository],
})
export class PostModule {}
