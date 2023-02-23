import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LoginRequest, LoginResponse } from '../../auth/auth.pb';
import { serializeUserAgentToString } from '../mapper';
import { cleanResponseData, setCookieLoginSuccess } from '../providers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly authService: AuthService) {}

  private serializeLoginRequest(
    req: any,
    username: string,
    password: string,
  ): LoginRequest {
    const cookieMaxAge: number = req.session.cookie.originalMaxAge;

    const { deviceName, deviceType } = serializeUserAgentToString(
      req.get('user-agent'),
    );
    const sessionID: string = req.sessionID;

    return {
      ip: '::1', // for local ip
      password: password,
      username: username,
      deviceName: deviceName,
      deviceType: deviceType,
      sessionId: sessionID,
      sessionExpire: cookieMaxAge,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const loginResponse: LoginResponse = await this.authService.login(
      this.serializeLoginRequest(
        request,
        request.body.username,
        request.body.password,
      ),
    );

    if (!loginResponse.isLogged) {
      cleanResponseData(response);
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    setCookieLoginSuccess(response, loginResponse);
    return true;
  }
}
