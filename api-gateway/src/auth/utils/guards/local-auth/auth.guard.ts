import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../../auth.service';
import { LoginRequest, LoginResponse } from '../../../auth.pb';
import * as DeviceDetector from 'device-detector-js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly authService: AuthService) {}

  private serialize(
    req: any,
    username: string,
    password: string,
  ): LoginRequest {
    const deviceDetector = new DeviceDetector();

    const parser: DeviceDetector.DeviceDetectorResult = deviceDetector.parse(
      req.get('user-agent'),
    );
    const os: string | null = parser.os?.name;
    const device: string | null =
      parser.device?.type + ' ' + parser.device?.brand;
    const client: string | null = parser.client.type + ' ' + parser.client.name;

    return {
      ip: 'localhost',
      password: '1234',
      username: 'dasdas',
      userAgent: os + ' ' + device + ' ' + client,
      sessionId: 'dsdasd3edsa',
      sessionExpire: '19-02-2022',
    };
  }

  // implement login
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const loginResponse: LoginResponse = await this.authService.login(
      this.serialize(request, request.body.username, request.body.password),
    );

    if (!loginResponse.isLogged)
      throw new UnauthorizedException('Неверный логин или пароль');

    request.user = loginResponse.user;

    console.log(request.sessionID);
    return true;
  }
}
