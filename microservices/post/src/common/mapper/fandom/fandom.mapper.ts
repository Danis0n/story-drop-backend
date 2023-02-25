import { Injectable } from '@nestjs/common';
import { FandomPrisma } from '../../dto/fandom/fandom-prisma.interface';

@Injectable()
export class FandomMapper {
  public mapToFandomDto(fandom: FandomPrisma) {
    return null;
  }
}
