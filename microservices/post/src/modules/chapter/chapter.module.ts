import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { ChapterMapper, ChapterRepository } from '../../common';

@Module({
  providers: [ChapterService, ChapterRepository, ChapterMapper],
  controllers: [ChapterController],
})
export class ChapterModule {}
