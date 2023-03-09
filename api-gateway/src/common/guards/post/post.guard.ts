import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PostService } from '../../../modules/post/post.service';

@Injectable()
export class PostGuard implements CanActivate {
  @Inject(PostService) private readonly service: PostService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const postId = request.params.id;
    const userId = request.UID;

    const { success } = await this.service.isOwner({
      postId: postId,
      userId: userId,
    });

    return success;
  }
}
