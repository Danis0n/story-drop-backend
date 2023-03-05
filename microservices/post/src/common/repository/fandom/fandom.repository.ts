import { Inject, Injectable, Logger } from '@nestjs/common';
import { FandomPrisma } from '../../dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class FandomRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(name: string): Promise<FandomPrisma> {
    try {
      return await this.prisma.fandom.create({
        data: {
          fandom_id: randomUUID(),
          fandom_name: name,
        },
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания фандома: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findId(fandomId: string): Promise<FandomPrisma> {
    try {
      return await this.prisma.fandom.findUnique({
        where: { fandom_id: fandomId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска фандома по id: ${fandomId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findCharacterId(
    characterId: string,
  ): Promise<{ fandom: FandomPrisma }> {
    try {
      return await this.prisma.character.findUnique({
        where: { character_id: characterId },
        select: {
          fandom: true,
        },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска фандома по CharacterId: ${characterId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findNameMany(name: string): Promise<FandomPrisma[]> {
    try {
      return await this.prisma.fandom.findMany({
        where: { fandom_name: { contains: name, mode: 'insensitive' } },
      });
    } catch (e) {
      Logger.error(
        `findNameMany: Ошибка во время поиска фандомов по имени: ${name}. ${e}`,
      );
      return null;
    }
  }

  public async update(name: string, fandomId: string): Promise<FandomPrisma> {
    try {
      return await this.prisma.fandom.update({
        where: { fandom_id: fandomId },
        data: { fandom_name: name },
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время обновлении фандома: ${name}, ${fandomId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(fandomId: string): Promise<FandomPrisma> {
    try {
      return await this.prisma.fandom.delete({
        where: { fandom_id: fandomId },
      });
    } catch (e) {
      Logger.error(
        `delete: Ошибка во время удалени фандома: ${fandomId}. ${e?.messagee}`,
      );
      return null;
    }
  }
}
