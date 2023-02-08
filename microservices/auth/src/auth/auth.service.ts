import { Injectable } from '@nestjs/common';
import {
  FindOneUserIdBySessionRequestDto,
  FindOneUserIdBySessionResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutResponseDto,
  ValidateRequestDto,
  ValidateResponseDto,
} from '../common';

@Injectable()
export class AuthService {
  public async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    return { deviceId: '', isLogged: false, sessionId: '', user: null };
  }

  // change ip-address in db if it's new
  public async validate(
    payload: ValidateRequestDto,
  ): Promise<ValidateResponseDto> {
    return { permission: false };
  }

  public async logout(payload: ValidateRequestDto): Promise<LogoutResponseDto> {
    return { isLoggedOut: false };
  }

  public async findOneUserIdBySession(
    payload: FindOneUserIdBySessionRequestDto,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return { uuid: '' };
  }
}
