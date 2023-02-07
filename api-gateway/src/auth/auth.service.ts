import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginRequest,
  LoginResponse,
  ValidateResponse,
} from './auth.pb';
import { firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { FindOneRolesResponseDto } from '../common';

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
  ): Promise<ValidateResponse> {
    return await firstValueFrom(
      this.authServiceClient.validate({ sessionId, deviceId, ip }),
    );
  }

  public async login(login: LoginRequest): Promise<LoginResponse> {
    return await firstValueFrom(this.authServiceClient.login(login));
  }

  async findOneUserIdBySession(session: string) {
    return undefined;
  }
}
