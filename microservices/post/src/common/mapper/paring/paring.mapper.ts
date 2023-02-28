import { Injectable } from '@nestjs/common';
import { InsertCharacter, ParingDto, ParingPrisma } from '../../dto';

@Injectable()
export class ParingMapper {
  public mapToParingDto({ paring_id, paring_name }: ParingPrisma): ParingDto {
    return { name: paring_name, paringId: paring_id };
  }

  public mapToInsertCharacters(characterIds: string[]): InsertCharacter[] {
    return characterIds.map((id) => {
      return this.mapToInsertCharacter(id);
    });
  }

  private mapToInsertCharacter(characterId: string): InsertCharacter {
    return { age_id: characterId };
  }
}
