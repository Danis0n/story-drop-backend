import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InsertCharacter, ParingPrisma } from '../../dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ParingRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(
    name: string,
    insertCharacters: InsertCharacter[],
  ): Promise<ParingPrisma> {
    try {
      return await this.prisma.paring.create({
        data: {
          paring_id: randomUUID(),
          paring_name: name,
          character_paring: { create: insertCharacters },
        },
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания пейринга: ${name}, ${JSON.stringify(
          insertCharacters,
        )}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findId(paringId: string): Promise<ParingPrisma> {
    try {
      return await this.prisma.paring.findUnique({
        where: { paring_id: paringId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска пейринга: ${paringId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findNameMany(name: string): Promise<ParingPrisma[]> {
    try {
      return await this.prisma.paring.findMany({
        where: { paring_name: { contains: name } },
      });
    } catch (e) {
      Logger.error(
        `findNameMany: Ошибка во время поиска пейрингов: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findCharacterId(
    characterId: string,
  ): Promise<{ paring: ParingPrisma }[]> {
    try {
      return await this.prisma.character_paring.findMany({
        where: { character_id: characterId },
        select: { paring: true },
      });
    } catch (e) {
      Logger.error(
        `findCharacterId: Ошибка во время поиска пейрингов по characterId: ${characterId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async update(
    paringId: string,
    name: string,
    insertCharacters: InsertCharacter[],
    deleteCharacters: InsertCharacter[],
  ): Promise<ParingPrisma> {
    try {
      return await this.prisma.paring.update({
        where: { paring_id: paringId },
        data: {
          paring_name: name || undefined,
          character_paring: {
            create: insertCharacters || undefined,
            deleteMany: deleteCharacters || undefined,
          },
        },
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время поиска пейрингов: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(paringId: string): Promise<ParingPrisma> {
    try {
      return await this.prisma.paring.delete({
        where: { paring_id: paringId },
      });
    } catch (e) {
      Logger.error(
        `delete: Ошибка во время удаления пейринга: ${paringId}. ${e?.message}`,
      );
      return null;
    }
  }
}
