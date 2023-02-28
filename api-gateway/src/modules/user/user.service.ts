import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindOneRolesResponseDto } from '../../common';

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

  public async findOneRoles(uuid: string): Promise<FindOneRolesResponseDto> {
    return await firstValueFrom(
      this.userServiceClient.findOneRoles({ uuid: uuid }),
    );
  }
}
