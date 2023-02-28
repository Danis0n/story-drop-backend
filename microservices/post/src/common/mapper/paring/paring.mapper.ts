import { Injectable } from '@nestjs/common';
import {
  InsertCharacter,
  ParingPrisma,
} from '../../dto/paring/paring-prisma.interface';
import { ParingDto } from '../../dto';

@Injectable()
export class ParingMapper {
  public mapToParingDto({ paring_id, paring_name }: ParingPrisma): ParingDto {
    return { name: paring_name, paringId: paring_id };
  }

  public mapToPrismaCharacterIds(characterIds: string[]): InsertCharacter[] {
    return characterIds.map((id) => {
      return this.mapToPrismaCharacterId(id);
    });
  }

  private mapToPrismaCharacterId(characterId: string): InsertCharacter {
    return { character_id: characterId };
  }
}
