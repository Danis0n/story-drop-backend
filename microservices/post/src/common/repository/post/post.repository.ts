import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PostInclude, PostWithRelations } from '../../validation/post.prisma';
import {
  CreatePostRequestDto,
  PostPrisma,
  UpdatePostRequestDto,
} from '../../dto';
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
          is_finished: false,
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

  public async update(
    payload: UpdatePostRequestDto,
  ): Promise<PostWithRelations> {
    try {
      return await this.prisma.post.update({
        where: { post_id: payload.postId },
        data: {
          post_name: payload.name || undefined,
          dedication: payload.dedication || undefined,
          description: payload.description || undefined,
          is_hidden: payload.isHidden || undefined,
          is_finished: payload.isFinished || undefined,
        },
        include: PostInclude,
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время обновления поста по id: ${JSON.stringify(
          payload,
        )}. ${e?.message}`,
      );
      return null;
    }
  }

  public async insertParings(
    postId: string,
    ids: string[],
  ): Promise<PostPrisma> {
    try {
      return await this.prisma.post.update({
        where: { post_id: postId },
        data: {
          paring_post: {
            createMany: {
              data: ParingMapper.toPrisma(ids),
            },
          },
        },
      });
    } catch (e) {
      Logger.error(
        `insertParings: Ошибка во время добавления пейринга к посту по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async insertFandoms(
    postId: string,
    ids: string[],
  ): Promise<PostPrisma> {
    try {
      return await this.prisma.post.update({
        where: { post_id: postId },
        data: {
          fandom_post: {
            createMany: {
              data: FandomMapper.toPrisma(ids),
            },
          },
        },
      });
    } catch (e) {
      Logger.error(
        `insertParings: Ошибка во время добавления фандома к посту по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async insertGenres(
    postId: string,
    ids: string[],
  ): Promise<PostPrisma> {
    try {
      return await this.prisma.post.update({
        where: { post_id: postId },
        data: {
          post_genre: {
            createMany: {
              data: GenreMapper.toPrisma(ids),
            },
          },
        },
      });
    } catch (e) {
      Logger.error(
        `insertGenres: Ошибка во время добавления жанра к посту по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async insertCharacters(
    postId: string,
    ids: string[],
  ): Promise<PostPrisma> {
    try {
      return await this.prisma.post.update({
        where: { post_id: postId },
        data: {
          character_post: {
            createMany: {
              data: CharacterMapper.toPrisma(ids),
            },
          },
        },
      });
    } catch (e) {
      Logger.error(
        `insertCharacters: Ошибка во время добавления персонажей к посту по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async insertTags(postId: string, ids: string[]): Promise<PostPrisma> {
    try {
      return await this.prisma.post.update({
        where: { post_id: postId },
        data: {
          post_tag: {
            createMany: {
              data: TagMapper.toPrisma(ids),
            },
          },
        },
      });
    } catch (e) {
      Logger.error(
        `insertCharacters: Ошибка во время добавления тега к посту по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async deleteTag(
    postId: string,
    tagId,
  ): Promise<{ post_id: string; tag_id: string }> {
    try {
      return await this.prisma.post_tag.delete({
        where: { tag_id_post_id: { tag_id: tagId, post_id: postId } },
      });
    } catch (e) {
      Logger.error(
        `deleteTags: Ошибка во время удаления тега с поста по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async deleteGenre(
    postId: string,
    genreId,
  ): Promise<{ post_id: string; genre_id: string }> {
    try {
      return await this.prisma.post_genre.delete({
        where: { genre_id_post_id: { genre_id: genreId, post_id: postId } },
      });
    } catch (e) {
      Logger.error(
        `deleteTags: Ошибка во время удаления тега с поста по id: ${postId}. ${e?.message}`,
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
        `delete: Ошибка во время удаления поста по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async isOwner(postId: string): Promise<{ user_id: string }> {
    try {
      return await this.prisma.post.findUnique({
        where: { post_id: postId },
        select: { user_id: true },
      });
    } catch (e) {
      Logger.error(
        `delete: Ошибка во время удаления поста по id: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }
}
