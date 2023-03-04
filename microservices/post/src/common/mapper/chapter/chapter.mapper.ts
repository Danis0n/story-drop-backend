import { Injectable } from '@nestjs/common';
import { ChapterPrisma } from '../../dto/chapter/chapter-prisma.interface';
import { ChapterDto } from '../../dto';
import { Builder } from 'builder-pattern';

@Injectable()
export class ChapterMapper {
  public static toDto(chapter: ChapterPrisma): ChapterDto {
    return Builder(ChapterDto)
      .dateOfCreation(chapter.date_of_creation.toString())
      .number(chapter.number.toString())
      .chapterId(chapter.chapter_id)
      .name(chapter.chapter_name)
      .postId(chapter.post_id)
      .notes(chapter.notes)
      .text(chapter.text)
      .build();
  }
}
