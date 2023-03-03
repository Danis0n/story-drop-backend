import { Injectable } from '@nestjs/common';
import { PostDto } from '../../dto';
import { PostWithRelations } from '../../validation/post.prisma';

@Injectable()
export class PostMapper {
  public mapToPostDto(post: PostWithRelations): PostDto {
    return null;
  }
}
