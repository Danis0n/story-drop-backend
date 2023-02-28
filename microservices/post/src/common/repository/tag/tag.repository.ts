import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TagPrisma } from '../../dto';
import { randomUUID } from 'crypto';
import { AgeInclude, TagWithRelation } from '../../validation';

@Injectable()
export class TagRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(name: string, ageId: string): Promise<TagWithRelation> {
    try {
      return await this.prisma.tag.create({
        data: {
          tag_id: randomUUID(),
          tag_name: name,
          age: { connect: { age_id: ageId } },
        },
        include: AgeInclude,
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания тэга: ${name}, ${ageId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findId(tagId: string): Promise<TagWithRelation> {
    try {
      return await this.prisma.tag.findUnique({
        where: { tag_id: tagId },
        include: AgeInclude,
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска тэга по id: ${tagId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async update(tagId: string, name: string): Promise<TagWithRelation> {
    try {
      return await this.prisma.tag.update({
        where: { tag_id: tagId },
        data: { tag_name: name },
        include: AgeInclude,
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время обновлении тэга: ${tagId}, ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(tagId: string): Promise<TagPrisma> {
    try {
      return await this.prisma.tag.delete({
        where: { tag_id: tagId },
      });
    } catch (e) {
      Logger.error(
        `delete: Ошибка во время удалени тэга: ${tagId}. ${e?.messagee}`,
      );
      return null;
    }
  }
}
