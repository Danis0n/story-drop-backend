import { Injectable } from '@nestjs/common';
import { FandomDto, FandomPrisma } from '../../dto';

@Injectable()
export class FandomMapper {
  public static toDto({ fandom_id, fandom_name }: FandomPrisma): FandomDto {
    return { fandomId: fandom_id, name: fandom_name };
  }

  public static toPrisma(fandomIds: string[]): { fandom_id: string }[] {
    return fandomIds.map((id) => {
      return { fandom_id: id };
    });
  }
}
