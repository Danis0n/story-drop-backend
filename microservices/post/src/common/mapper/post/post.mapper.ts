import { Injectable } from '@nestjs/common';
import { ChapterRecordDto, PostDto } from '../../dto';
import { PostWithRelations } from '../../validation/post.prisma';
import { Builder } from 'builder-pattern';
import { ChapterPrisma } from '../../dto/chapter/chapter-prisma.interface';
import { ParingMapper } from '../paring';
import { GenreMapper } from '../genre';
import { CharacterMapper } from '../character';
import { FandomMapper } from '../fandom';

@Injectable()
export class PostMapper {
  public static toDto(post: PostWithRelations): PostDto {
    return Builder(PostDto)
      .dateOfCreation(post.date_of_creation.toString())
      .isHiddenAdmin(post.is_hidden_admin)
      .status(post.status.status_name)
      .description(post.description)
      .dedication(post.description)
      .isHidden(post.is_hidden)
      .postId(post.post_id)
      .userId(post.user_id)
      .name(post.post_name)
      .fandoms(
        post.fandom_post.map(({ fandom }) => {
          return FandomMapper.toDto(fandom);
        }),
      )
      .chapters(
        post.chapter.map((chapter) => {
          return this.toDtoChapterRecord(chapter);
        }),
      )
      .characters(
        post.character_post.map(({ character }) => {
          return CharacterMapper.toDto(character);
        }),
      )
      .genres(
        post.post_genre.map(({ genre }) => {
          return GenreMapper.toDto(genre);
        }),
      )
      .parings(
        post.paring_post.map(({ paring }) => {
          return ParingMapper.toDto(paring);
        }),
      )
      .build();
  }

  public static toDtoChapterRecord(c: ChapterPrisma): ChapterRecordDto {
    return Builder(ChapterRecordDto)
      .dateOfCreation(c.date_of_creation.toString())
      .number(c.number.toString())
      .chapterId(c.chapter_id)
      .name(c.chapter_name)
      .postId(c.post_id)
      .build();
  }
}
