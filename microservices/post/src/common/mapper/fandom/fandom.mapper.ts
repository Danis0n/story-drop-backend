import { Injectable } from '@nestjs/common';
import { FandomPrisma } from '../../dto';

@Injectable()
export class FandomMapper {
  public mapToFandomDto(fandom: FandomPrisma) {
    return null;
  }

  public mapToFandomPrismas(fandomIds: string[]): { fandom_id: string }[] {
    return fandomIds.map((id) => {
      return { fandom_id: id };
    });
  }
}
