import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME } from './proto/auth.pb';
import { AuthService } from './auth.service';
import {
  LOGIN_METHOD,
  VALIDATE_METHOD,
  LoginRequestDto,
  LoginResponseDto,
  ValidateRequestDto,
  ValidateResponseDto,
  LOGOUT_METHOD,
  LogoutResponseDto,
  FIND_ONE_USER_ID_BY_SESSION_METHOD,
  FindOneUserIdBySessionResponseDto,
  FindOneUserIdBySessionRequestDto,
  REGISTER_METHOD,
  RegisterResponseDto,
  RegisterRequestDto,
} from '../common';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, LOGIN_METHOD)
  private async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    return this.service.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, LOGOUT_METHOD)
  private async logout(
    payload: ValidateRequestDto,
  ): Promise<LogoutResponseDto> {
    return this.service.logout(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, REGISTER_METHOD)
  private async register(
    payload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, VALIDATE_METHOD)
  private async validate(
    payload: ValidateRequestDto,
  ): Promise<ValidateResponseDto> {
    return this.service.validate(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, FIND_ONE_USER_ID_BY_SESSION_METHOD)
  private async findOneUserIdBySession(
    payload: FindOneUserIdBySessionRequestDto,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return this.service.findOneUserIdBySession(payload);
  }
}
