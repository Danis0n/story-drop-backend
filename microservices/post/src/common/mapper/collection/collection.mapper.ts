import { Injectable } from '@nestjs/common';
import {
  CollectionPrisma,
  InsertPost,
} from '../../dto/collection/collection-prisma.interface';
import { CollectionDto } from '../../dto';

@Injectable()
export class CollectionMapper {
  public mapToCollectionDto(collection: CollectionPrisma): CollectionDto {
    return null;
  }

  private mapToPrismaPostId(postId: string): InsertPost {
    return { post_id: postId };
  }

  public mapToPrismaPostIds(postIds: string[]): InsertPost[] {
    return postIds.map((postId) => {
      return this.mapToPrismaPostId(postId);
    });
  }
}
