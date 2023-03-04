import { Injectable } from '@nestjs/common';
import { ParingDto, ParingPrisma } from '../../dto';

@Injectable()
export class ParingMapper {
  public static toDto({ paring_id, paring_name }: ParingPrisma): ParingDto {
    return { name: paring_name, paringId: paring_id };
  }

  public static toPrisma(paringIds: string[]): { paring_id: string }[] {
    return paringIds.map((id) => {
      return { paring_id: id };
    });
  }
}
