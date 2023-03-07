import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PostService } from '../../../modules/post/post.service';

@Injectable()
export class ChapterGuard implements CanActivate {
  @Inject(PostService) private readonly service: PostService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const chapterId = request.params.id;
    const userId = request.UID;

    const { success } = await this.service.isOwnerChapter({
      chapterId: chapterId,
      userId: userId,
    });

    return success;
  }
}
