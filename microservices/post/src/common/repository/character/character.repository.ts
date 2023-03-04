import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { CharacterPrisma } from '../../dto';

@Injectable()
export class CharacterRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(
    name: string,
    fandomId: string,
  ): Promise<CharacterPrisma> {
    try {
      return await this.prisma.character.create({
        data: {
          character_name: name,
          character_id: randomUUID(),
          fandom: { connect: { fandom_id: fandomId } },
        },
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания персонажа: ${name}, ${fandomId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findName(name: string): Promise<CharacterPrisma> {
    try {
      return await this.prisma.character.findUnique({
        where: { character_name: name },
      });
    } catch (e) {
      Logger.error(
        `findName: Ошибка во время поиска персонажа по name: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findNameMany(name: string): Promise<CharacterPrisma[]> {
    try {
      return await this.prisma.character.findMany({
        where: { character_name: { contains: name, mode: 'insensitive' } },
      });
    } catch (e) {
      Logger.error(
        `findNameMany: Ошибка во время поиска персонажей по name: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findId(characterId: string): Promise<CharacterPrisma> {
    try {
      return await this.prisma.character.findUnique({
        where: { character_id: characterId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска персонажа по id: ${characterId}. ${e?.message}`,
      );
      return null;
    }
  }

  // TODO: implement many-to-many delete (delete character from fandom)
  public async update(
    characterId: string,
    name: string,
  ): Promise<CharacterPrisma> {
    try {
      return await this.prisma.character.update({
        where: { character_id: characterId },
        data: {
          character_name: name || undefined,
        },
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время обновления персонажа: ${characterId}, ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(characterId: string): Promise<CharacterPrisma> {
    try {
      return await this.prisma.character.delete({
        where: { character_id: characterId },
      });
    } catch (e) {
      Logger.error(`delete: Ошибка во время удаления персонажа. ${e?.message}`);
      return null;
    }
  }
}
