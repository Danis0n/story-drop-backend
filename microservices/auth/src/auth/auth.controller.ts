import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  ValidateRequest,
  ValidateResponse,
} from './proto/auth.pb';

@Controller()
export class AuthController {
  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private async login(payload: LoginRequest): Promise<LoginResponse> {
    console.log(payload);
    return {
      deviceId: payload.userAgent,
      isLogged: true,
      sessionId: payload.sessionId,
      user: {
        isAvatar: false,
        email: 'sood',
        info: null,
        isEnabled: true,
        isLocked: false,
        nickname: 'dans',
        roles: ['admin'],
        username: payload.username,
        uuid: '123',
      },
    };
  }

  // change ip-address in db if it's new
  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private async validate(payload: ValidateRequest): Promise<ValidateResponse> {
    console.log(payload);
    return { permission: true };
  }
}
