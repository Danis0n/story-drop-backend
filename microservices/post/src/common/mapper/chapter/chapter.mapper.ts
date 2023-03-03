import { Injectable } from '@nestjs/common';
import { ChapterPrisma } from '../../dto/chapter/chapter-prisma.interface';
import { ChapterDto } from '../../dto';
import { Builder } from 'builder-pattern';

@Injectable()
export class ChapterMapper {
  public mapToChapterDto(chapter: ChapterPrisma): ChapterDto {
    return Builder(ChapterDto)
      .dateOfCreation(chapter.date_of_creation.toString())
      .chapterId(chapter.chapter_id || null)
      .number(chapter.number.toString())
      .notes(chapter.notes || null)
      .text(chapter.text || null)
      .name(chapter.chapter_name)
      .postId(chapter.post_id)
      .build();
  }
}
