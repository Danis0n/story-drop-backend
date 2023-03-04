import { Injectable } from '@nestjs/common';
import { CollectionDto, CollectionPrisma, InsertPost } from '../../dto';
import { Builder } from 'builder-pattern';

@Injectable()
export class CollectionMapper {
  public static toDto(c: CollectionPrisma): CollectionDto {
    return Builder(CollectionDto)
      .collectionId(c.collection_id)
      .name(c.collection_name)
      .isHidden(c.is_hidden)
      .userId(c.user_id)
      .build();
  }

  public static mapToPrismaPostId(postId: string): InsertPost {
    return { post_id: postId };
  }

  public static mapToPrismaPostIds(postIds: string[]): InsertPost[] {
    return postIds.map((postId) => {
      return { post_id: postId };
    });
  }
}
