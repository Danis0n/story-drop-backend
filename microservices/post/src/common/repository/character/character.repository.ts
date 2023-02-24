import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { CharacterPrismaDto } from '../../dto';

@Injectable()
export class CharacterRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(
    name: string,
    fandomId: string,
  ): Promise<CharacterPrismaDto> {
    try {
      return await this.prisma.character.create({
        data: {
          character_name: name,
          character_id: randomUUID(),
          fandom_character: { create: [{ fandom_id: fandomId }] },
        },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время создания персонажа: ${name}, ${fandomId}. ${e}`,
      );
      return null;
    }
  }

  public async findName(name: string): Promise<CharacterPrismaDto> {
    try {
      return await this.prisma.character.findUnique({
        where: { character_name: name },
      });
    } catch (e) {
      Logger.error(`Ошибка во время поиска персонажа по name: ${name}. ${e}`);
      return null;
    }
  }

  public async findNameMany(name: string): Promise<CharacterPrismaDto[]> {
    try {
      return await this.prisma.character.findMany({
        where: { character_name: { contains: name } },
      });
    } catch (e) {
      Logger.error(`Ошибка во время поиска персонажей по name: ${name}. ${e}`);
      return null;
    }
  }

  public async findId(characterId: string): Promise<CharacterPrismaDto> {
    try {
      return await this.prisma.character.findUnique({
        where: { character_id: characterId },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время поиска персонажа по id: ${characterId}. ${e}`,
      );
      return null;
    }
  }

  // TODO: implement many-to-many delete (delete character from fandom)
  public async update(
    characterId: string,
    name: string,
    fandomId: string,
  ): Promise<CharacterPrismaDto> {
    try {
      return await this.prisma.character.update({
        where: { character_id: characterId },
        data: {
          character_name: name || undefined,
          fandom_character: { create: [{ fandom_id: fandomId }] },
        },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время обновления персонажа: ${characterId}, ${name}, ${fandomId}. ${e}`,
      );
      return null;
    }
  }

  public async delete(characterId: string): Promise<CharacterPrismaDto> {
    try {
      return await this.prisma.character.delete({
        where: { character_id: characterId },
      });
    } catch (e) {
      Logger.error(`Ошибка во время удаления персонажа. ${e}`);
      return null;
    }
  }
}
