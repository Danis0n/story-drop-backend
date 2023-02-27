import { Injectable } from '@nestjs/common';
import {
  CollectionPostPrisma,
  CollectionPrisma,
} from '../../dto/collection/collection-prisma.interface';
import { CollectionDto } from '../../dto';

@Injectable()
export class CollectionMapper {
  public mapToCollectionDto(collection: CollectionPrisma): CollectionDto {
    return null;
  }

  private mapToPrismaPostId(postId: string): CollectionPostPrisma {
    return { post_id: postId };
  }

  public mapToPrismaPostIds(postIds: string[]): CollectionPostPrisma[] {
    return postIds.map((postId) => {
      return this.mapToPrismaPostId(postId);
    });
  }
}
