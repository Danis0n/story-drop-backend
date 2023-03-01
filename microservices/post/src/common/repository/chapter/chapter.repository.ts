import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateChapterRequestDto, UpdateChapterRequestDto } from '../../dto';
import { ChapterPrisma } from '../../dto/chapter/chapter-prisma.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class ChapterRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(
    payload: CreateChapterRequestDto,
    number: number,
  ): Promise<ChapterPrisma> {
    try {
      return await this.prisma.chapter.create({
        data: {
          chapter_id: randomUUID(),
          chapter_name: payload.name,
          notes: payload.notes,
          text: payload.text,
          number: number,
          date_of_creation: new Date(),
          post: { connect: { post_id: payload.postId } },
        },
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания главы: ${JSON.stringify(payload)}. ${
          e?.message
        }`,
      );
      return null;
    }
  }

  public async update(
    payload: UpdateChapterRequestDto,
  ): Promise<ChapterPrisma> {
    try {
      return await this.prisma.chapter.update({
        where: { chapter_id: payload.chapterId },
        data: {
          chapter_name: payload.name || undefined,
          notes: payload.notes || undefined,
          text: payload.text || undefined,
        },
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время обновления главы: ${JSON.stringify(
          payload,
        )}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findId(chapterId: string): Promise<ChapterPrisma> {
    try {
      return await this.prisma.chapter.findUnique({
        where: { chapter_id: chapterId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска главы по id: ${chapterId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findPostId(postId: string): Promise<ChapterPrisma[]> {
    try {
      return await this.prisma.chapter.findMany({
        where: { post_id: postId },
      });
    } catch (e) {
      Logger.error(
        `findPostId: Ошибка во время поиска главы по postId: ${postId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(chapterId: string): Promise<ChapterPrisma> {
    try {
      return await this.prisma.chapter.delete({
        where: { chapter_id: chapterId },
      });
    } catch (e) {
      Logger.error(
        `delete: Ошибка во время удаления главы по id: ${chapterId}. ${e?.message}`,
      );
      return null;
    }
  }
}
