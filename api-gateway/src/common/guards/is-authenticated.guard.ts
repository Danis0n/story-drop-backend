import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { ValidateResponse } from '../../auth/auth.pb';
import { COOKIE_LOGGED_IN, COOKIE_MAX_AGE } from '../config';
import {
  cookieSerializer,
  setCookieLoginTrue,
  setCookieValidationFail,
} from '../service';

// for authenticated requests only.
// checks if request have a session, logged and device status. Updates it if necessary.
@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { device, logged, session, ip } = cookieSerializer(request);

    if (!session) {
      setCookieValidationFail(response);
      return false;
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
