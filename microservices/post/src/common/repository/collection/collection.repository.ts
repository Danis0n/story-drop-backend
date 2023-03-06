import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CharacterPrisma, CollectionPrisma, InsertPost } from '../../dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CollectionRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(
    name: string,
    userId: string,
    postIds: InsertPost[],
  ): Promise<CollectionPrisma> {
    try {
      return await this.prisma.collection.create({
        data: {
          collection_id: randomUUID(),
          collection_name: name,
          user_id: userId,
          is_hidden: false,
          collection_post: {
            create: postIds || undefined,
          },
        },
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания коллекции: ${name}, ${userId}, ${
          postIds ? JSON.stringify(postIds) : null
        }. ${e?.message}`,
      );
      return null;
    }
  }

  public async findId(collectionId: string): Promise<CollectionPrisma> {
    try {
      return await this.prisma.collection.findUnique({
        where: { collection_id: collectionId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска коллекции по id: ${collectionId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findUserId(userId: string): Promise<CollectionPrisma[]> {
    try {
      return await this.prisma.collection.findMany({
        where: { user_id: userId },
      });
    } catch (e) {
      Logger.error(
        `findUserId: Ошибка во время поиска коллекций по userId: ${userId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findManyName(name: string): Promise<CollectionPrisma[]> {
    try {
      return await this.prisma.collection.findMany({
        where: { collection_name: { contains: name, mode: 'insensitive' } },
      });
    } catch (e) {
      Logger.error(
        `findUserId: Ошибка во время поиска коллекций по имени: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async update(
    name: string,
    collectionId: string,
    isHidden: boolean,
    postIdsInsert: InsertPost[],
    postIdsDelete: InsertPost[],
  ) {
    try {
      return await this.prisma.collection.update({
        where: { collection_id: collectionId },
        data: {
          collection_name: name || undefined,
          is_hidden: isHidden || undefined,
          collection_post: {
            create: postIdsInsert || undefined,
            deleteMany: postIdsDelete || undefined,
          },
        },
      });
    } catch (e) {
      Logger.error(
        `updateName: Ошибка во время обновлении коллекции-постов: ${collectionId}, ${JSON.stringify(
          postIdsInsert,
        )}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(collectionId: string): Promise<CharacterPrisma> {
    try {
      return await this.prisma.character.delete({
        where: { character_id: collectionId },
      });
    } catch (e) {
      Logger.error(`delete: Ошибка во время удаления персонажа. ${e?.message}`);
      return null;
    }
  }
}
