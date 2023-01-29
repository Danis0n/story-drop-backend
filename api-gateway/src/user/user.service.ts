import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User, USER_SERVICE_NAME, UserServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly userClient: ClientGrpc;

  public onModuleInit(): void {
    this.userServiceClient =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public async findBySession(session: string) {
    return await firstValueFrom(
      this.userServiceClient.findOneSession({ sessionId: session }),
    );
  }
}
