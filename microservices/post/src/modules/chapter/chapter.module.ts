import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { ChapterMapper, ChapterRepository } from '../../common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChapterService, ChapterRepository, ChapterMapper],
  controllers: [ChapterController],
  exports: [ChapterMapper],
})
export class ChapterModule {}
