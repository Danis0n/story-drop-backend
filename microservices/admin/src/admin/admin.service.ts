import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  UpdateBannedResponseDto,
  UpdateBannedRequestDto,
  UpdateEnabledRequestDto,
  UpdateEnabledResponseDto,
  DeleteUserResponseDto,
  DeletePostResponseDto,
  DeleteUserRequestDto,
  DeletePostRequestDto,
} from '../common';
import { USER_SERVICE_NAME, UserServiceClient } from './proto/user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdminService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly userClient: ClientGrpc;

  public onModuleInit(): void {
    this.userServiceClient =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public async updateBanned(
    payload: UpdateBannedRequestDto,
  ): Promise<UpdateBannedResponseDto> {
    const { success }: UpdateBannedResponseDto = await firstValueFrom(
      this.userServiceClient.updateBanned(payload),
    );

    return { success: success };
  }

  public async updateEnabled(
    payload: UpdateEnabledRequestDto,
  ): Promise<UpdateEnabledResponseDto> {
    const { success }: UpdateEnabledResponseDto = await firstValueFrom(
      this.userServiceClient.updateEnabled(payload),
    );

    return { success: success };
  }

  public async deleteUser({
    uuid,
  }: DeleteUserRequestDto): Promise<DeleteUserResponseDto> {
    return { success: false };
  }

  public async deletePost({
    uuid,
  }: DeletePostRequestDto): Promise<DeletePostResponseDto> {
    return { success: false };
  }
}
