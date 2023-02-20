import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { FindOneUserIdBySessionResponseDto } from '../dto';
import { COOKIE_SESSION } from '../constants';

@Injectable()
export class UserIdValidateGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.cookies[COOKIE_SESSION];

    const { uuid }: FindOneUserIdBySessionResponseDto =
      await this.authService.findOneUserIdBySession(session);

    if (!uuid) return false;
    request.userId = uuid;

    return true;
  }
}
