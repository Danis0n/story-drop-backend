import { Injectable } from '@nestjs/common';
import { ParingDto, ParingPrisma } from '../../dto';

@Injectable()
export class ParingMapper {
  public mapToParingDto({ paring_id, paring_name }: ParingPrisma): ParingDto {
    return { name: paring_name, paringId: paring_id };
  }

  public mapToParingPrismas(paringIds: string[]): { paring_id: string }[] {
    return paringIds.map((id) => {
      return { paring_id: id };
    });
  }

  public mapToCharacterPrismas(
    characterIds: string[],
  ): { character_id: string }[] {
    return characterIds.map((id) => {
      return { character_id: id };
    });
  }
}
