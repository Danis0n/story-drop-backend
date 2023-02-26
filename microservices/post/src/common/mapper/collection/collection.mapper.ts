import { Injectable } from '@nestjs/common';
import { CollectionPrisma } from '../../dto/collection/collection-prisma.interface';

@Injectable()
export class CollectionMapper {
  public mapToCollectionDto(collection: CollectionPrisma) {
    return null;
  }
}
