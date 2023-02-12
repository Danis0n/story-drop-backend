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
  getCookieValidate,
  setCookieLoginTrue,
  setCookieValidationFail,
} from '../service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { device, logged, session, ip } = getCookieValidate(request);

    if (!session) {
      setCookieValidationFail(response);
      throw new UnauthorizedException('Сессия не была найдена!');
    }

    if (!!session && !logged) {
      setCookieLoginTrue(response);
    }
    // if device_id is null, nothing changes
    const validate: ValidateResponse = await this.authService.validateUser(
      session,
      device,
      ip,
    );

    return validate.permission;
  }
}
