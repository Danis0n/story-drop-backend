import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { FindOneUserIdBySessionResponseDto } from '../dto';
import { COOKIE_MAX_AGE, COOKIE_SESSION, COOKIE_UID } from '../constants';
import { setCookieValidationFail } from '../providers';

@Injectable()
export class UserIdValidateGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  private async updateUIDWithCookie(request: any, response: any) {
    const session = request.cookies[COOKIE_SESSION];
    if (!session) return null;

    const { uuid }: FindOneUserIdBySessionResponseDto =
      await this.authService.findOneUserIdBySession(session);

    if (!uuid) return null;

    response.cookie(COOKIE_UID, uuid, {
      maxAge: COOKIE_MAX_AGE,
    });
    console.log(uuid);
    return uuid;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const UID = request.cookies[COOKIE_UID];

    const uid = UID ? UID : await this.updateUIDWithCookie(request, response);

    if (!uid) {
      setCookieValidationFail(response);
      throw new UnauthorizedException(
        'Идентификатор пользователя не был найден!',
      );
    }

    request.UID = uid;
    return true;
  }
}
