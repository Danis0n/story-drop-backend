import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PostInclude, PostWithRelations } from '../../validation/post.prisma';
import { CreatePostRequestDto, PostPrisma } from '../../dto';
import { randomUUID } from 'crypto';
import {
  CharacterMapper,
  FandomMapper,
  GenreMapper,
  ParingMapper,
  TagMapper,
} from '../../mapper';

@Injectable()
export class PostRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  @Inject(GenreMapper)
  private readonly gm: GenreMapper;

  @Inject(FandomMapper)
  private readonly fm: FandomMapper;

  @Inject(ParingMapper)
  private readonly pm: ParingMapper;

  @Inject(TagMapper)
  private readonly tm: TagMapper;

  @Inject(CharacterMapper)
  private readonly cm: CharacterMapper;

  public async create(
    payload: CreatePostRequestDto,
  ): Promise<PostWithRelations> {
    try {
      return await this.prisma.post.create({
        data: {
          post_id: randomUUID(),
          post_name: payload.name,
          user_id: payload.userId,
          description: payload.description || undefined,
          dedication: payload.dedication || undefined,
          date_of_creation: new Date(),
          is_hidden: false,
          is_hidden_admin: false,
          status: {
            connect: { status_id: 'writingId!' }, // TODO: fix IT!!
          },
          post_genre: {
            create: this.gm.mapToGenrePrismas(payload.genreIds),
          },
          fandom_post: {
            create: this.fm.mapToFandomPrismas(payload.fandomIds),
          },
          paring_post: {
            create: this.pm.mapToParingPrismas(payload.paringIds),
          },
          post_tag: {
            create: this.tm.mapToTagPrisma(payload.tagIds),
          },
          character_post: {
            create: this.cm.mapToCharacterPrisma(payload.characterIds),
          },
        },
        include: PostInclude,
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания поста: ${JSON.stringify(payload)}. ${
          e?.message
        }`,
      );
      return null;
    }
  }

  public async findId(postId: string): Promise<PostWithRelations> {
    try {
      return await this.prisma.post.findUnique({
        where: { post_id: postId },
        include: PostInclude,
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска поста по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(postId: string): Promise<PostPrisma> {
    try {
      return await this.prisma.post.delete({
        where: { post_id: postId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время удаления поста по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }
}
