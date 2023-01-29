import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
} from './proto/auth.pb';

@Controller()
export class AuthController {
  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private async login(payload: LoginRequest): Promise<LoginResponse> {
    return {
      deviceId: payload.userAgent,
      isLogged: true,
      sessionId: payload.sessionId,
      user: {
        avatar: null,
        email: 'sood',
        info: null,
        isEnabled: true,
        isLocked: false,
        nickname: 'dans',
        password: '321eas',
        roles: ['admin'],
        username: 'das',
        uuid: '123',
      },
    };
  }
}
