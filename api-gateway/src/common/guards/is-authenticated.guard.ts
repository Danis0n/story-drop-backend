import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { ValidateResponse } from '../../auth/auth.pb';
import {
  COOKIE_DEVICE,
  COOKIE_LOGGED_IN,
  COOKIE_MAX_AGE,
  COOKIE_SESSION,
} from '../config';

// for authenticated requests only.
// checks if request have a session, logged and device status. Updates it if necessary.
@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  private cookieSerializer(request: any) {
    const device = request.cookies[COOKIE_DEVICE];
    const logged = request.cookies[COOKIE_LOGGED_IN];
    const session = request.cookies[COOKIE_SESSION];
    const ip = request.socket.remoteAddress;

    return { device, logged, session, ip };
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { device, logged, session, ip } = this.cookieSerializer(request);

    if (!session) {
      response.cookie(COOKIE_DEVICE, '', {
        maxAge: 1,
      });
      response.cookie(COOKIE_LOGGED_IN, false, {
        maxAge: COOKIE_MAX_AGE,
      });
      return false;
    }

    if (!!session && !logged) {
      response.cookie(COOKIE_LOGGED_IN, true, {
        maxAge: COOKIE_MAX_AGE,
      });
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
