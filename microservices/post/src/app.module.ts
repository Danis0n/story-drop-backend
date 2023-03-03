import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { TagModule } from './modules/tag/tag.module';
import { CharacterModule } from './modules/character/character.module';
import { CollectionModule } from './modules/collection/collection.module';
import { FandomModule } from './modules/fandom/fandom.module';
import { ParingModule } from './modules/paring/paring.module';
import { ReadModule } from './modules/read/read.module';
import { GenreModule } from './modules/genre/genre.module';
import { ChapterModule } from './modules/chapter/chapter.module';

@Module({
  imports: [
    PrismaModule,
    PostModule,
    TagModule,
    ReadModule,
    CharacterModule,
    CollectionModule,
    FandomModule,
    ParingModule,
    GenreModule,
    ChapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
