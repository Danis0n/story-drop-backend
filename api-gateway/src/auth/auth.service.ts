import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserService } from '../user/user.service';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  ValidateResponse,
} from './auth.pb';
import { firstValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

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
  ): Promise<ValidateResponse> {
    return await firstValueFrom(
      this.authServiceClient.validate({ sessionId, deviceId }),
    );
  }
}
