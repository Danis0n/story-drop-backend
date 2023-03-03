import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PostService } from '../../../modules/post/post.service';

// TODO: check if user has access to the chapter

@Injectable()
export class ChapterGuard implements CanActivate {
  @Inject(PostService) private readonly service: PostService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
