import { Injectable } from '@nestjs/common';
import { CharacterPrisma } from '../../dto';

@Injectable()
export class CharacterMapper {
  public mapToCharacterDto(character: CharacterPrisma) {
    return null;
  }

  public mapToCharacterPrisma(characterIds: string[]) {
    return characterIds.map((id) => {
      return { character_id: id };
    });
  }
}
