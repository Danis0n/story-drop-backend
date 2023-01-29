import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../../auth.service';
import { LoginRequest, LoginResponse } from '../../../auth.pb';
import {
  COOKIE_DEVICE,
  COOKIE_LOGGED_IN,
  COOKIE_MAX_AGE,
} from '../../../../utils/config/constants';
import { serializeUserAgentToString } from '../../../../utils/mapper/user-agent.mapper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly authService: AuthService) {}

  private serialize(
    req: any,
    username: string,
    password: string,
  ): LoginRequest {
    const cookieMaxAge: number = req.session.cookie.originalMaxAge;
    const userAgent: string = serializeUserAgentToString(req.get('user-agent'));
    const sessionID: string = req.sessionID;

    return {
      ip: 'localhost',
      password: password,
      username: username,
      userAgent: userAgent,
      sessionId: sessionID,
      sessionExpire: cookieMaxAge,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const loginResponse: LoginResponse = await this.authService.login(
      this.serialize(request, request.body.username, request.body.password),
    );

    if (!loginResponse.isLogged)
      throw new UnauthorizedException('Неверный логин или пароль');

    request.user = loginResponse.user;

    response.cookie(COOKIE_DEVICE, loginResponse.deviceId, {
      maxAge: COOKIE_MAX_AGE,
    });
    response.cookie(COOKIE_LOGGED_IN, loginResponse.isLogged, {
      maxAge: COOKIE_MAX_AGE,
    });

    return true;
  }
}
