import { Injectable } from '@nestjs/common';
import { CharacterPrismaDto } from '../../dto';

@Injectable()
export class CharacterMapper {
  public mapToCharacterDto(character: CharacterPrismaDto) {
    return null;
  }
}
