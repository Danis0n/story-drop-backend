import { Injectable } from '@nestjs/common';
import { CharacterPrisma } from '../../dto';

@Injectable()
export class CharacterMapper {
  public mapToCharacterDto(character: CharacterPrisma) {
    return null;
  }
}
