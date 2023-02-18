import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { CharacterModule } from './character/character.module';
import { CollectionModule } from './collection/collection.module';
import { FandomModule } from './fandom/fandom.module';
import { ParingModule } from './paring/paring.module';

@Module({
  imports: [PostModule, TagModule, CharacterModule, CollectionModule, FandomModule, ParingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
