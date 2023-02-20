import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth.pb';
import { firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FindOneUserIdBySessionResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  LogoutResponseDto,
  ValidateResponseDto,
} from '../common';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly authClient: ClientGrpc;

  public onModuleInit(): void {
    this.authServiceClient =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validateUser(
    sessionId: string,
    deviceId: string,
    ip: string,
  ): Promise<ValidateResponseDto> {
    return await firstValueFrom(
      this.authServiceClient.validate({ sessionId, deviceId, ip }),
    );
  }

  public async login(login: LoginRequestDto): Promise<LoginResponseDto> {
    return await firstValueFrom(this.authServiceClient.login(login));
  }

  public async logout(logout: LogoutRequestDto): Promise<LogoutResponseDto> {
    return await firstValueFrom(this.authServiceClient.logout(logout));
  }

  async findOneUserIdBySession(
    session: string,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return await firstValueFrom(
      this.authServiceClient.findOneUserIdBySession({ session }),
    );
  }
}
