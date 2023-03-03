import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// TODO: check if beta has access to the post

@Injectable()
export class BetaChapterGuard implements CanActivate {
  // @Inject(BetaService) private readonly service: BetaService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
