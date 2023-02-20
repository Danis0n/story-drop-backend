import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { ValidateResponse } from '../../auth/auth.pb';
import {
  getRequestAuthData,
  setCookieValidationSuccess,
  setCookieValidationFail,
} from '../providers';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { device, logged, session, ip } = getRequestAuthData(request);

    if (!session) {
      setCookieValidationFail(response);
      throw new UnauthorizedException('Сессия не была найдена!');
    }

    if (!!session && !logged) {
      setCookieValidationSuccess(response);
    }

    const { permission }: ValidateResponse =
      await this.authService.validateUser(session, device, ip);

    return permission;
  }
}
