import { Injectable, Session, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';
import { LoginRequest, LoginResponse } from '../auth/auth.pb';
import {
  COOKIE_DEVICE,
  COOKIE_LOGGED_IN,
  COOKIE_MAX_AGE,
} from './config/constants';
import * as DeviceDetector from 'device-detector-js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ passReqToCallback: true });
  }

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

    console.log(req.sessionID);
    return {
      ip: 'localhost',
      password: '1234',
      username: 'dasdas',
      userAgent: os + ' ' + device + ' ' + client,
      sessionId: 'dsdasd3edsa',
      sessionExpire: '19-02-2022',
    };
  }

  public async validate(
    req: any,
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    // console.log(req.res);

    const response: LoginResponse = await this.authService.login(
      this.serialize(req, username, password),
    );

    if (!response.isLogged)
      throw new UnauthorizedException('Неверный логин или пароль');

    req.res.cookie(COOKIE_DEVICE, response.deviceId, {
      maxAge: COOKIE_MAX_AGE,
    });
    req.res.cookie(COOKIE_LOGGED_IN, response.isLogged, {
      maxAge: COOKIE_MAX_AGE,
    });

    return {
      deviceId: response.deviceId,
      isLogged: response.isLogged,
      sessionId: response.sessionId,
      user: response.user,
    };
  }
}
