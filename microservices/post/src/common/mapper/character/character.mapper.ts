import { Injectable } from '@nestjs/common';
import { CharacterDto, CharacterPrisma } from '../../dto';

@Injectable()
export class CharacterMapper {
  public static toDto({
    character_id,
    character_name,
  }: CharacterPrisma): CharacterDto {
    return { characterId: character_id, name: character_name };
  }

  public static toPrisma(characterIds: string[]) {
    if (!characterIds) return null;
    return characterIds.map((id) => {
      return { character_id: id };
    });
  }
}
