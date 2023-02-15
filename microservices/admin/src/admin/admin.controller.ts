import { Controller, Inject } from '@nestjs/common';
import { AdminService } from './admin.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ADMIN_SERVICE_NAME } from './proto/admin.pb';
import {
  DELETE_POST_METHOD,
  DELETE_USER_METHOD,
  DeletePostRequestDto,
  DeletePostResponseDto,
  DeleteUserRequestDto,
  DeleteUserResponseDto,
  UPDATE_BANNED_METHOD,
  UPDATE_ENABLED_METHOD,
  UpdateBannedRequestDto,
  UpdateBannedResponseDto,
  UpdateEnabledRequestDto,
  UpdateEnabledResponseDto,
} from '../common';

@Controller()
export class AdminController {
  @Inject(AdminService)
  private readonly service: AdminService;

  @GrpcMethod(ADMIN_SERVICE_NAME, UPDATE_BANNED_METHOD)
  private async updateBanned(
    payload: UpdateBannedRequestDto,
  ): Promise<UpdateBannedResponseDto> {
    return this.service.updateBanned(payload);
  }

  @GrpcMethod(ADMIN_SERVICE_NAME, UPDATE_ENABLED_METHOD)
  private async updateEnabled(
    payload: UpdateEnabledRequestDto,
  ): Promise<UpdateEnabledResponseDto> {
    return this.service.updateEnabled(payload);
  }

  @GrpcMethod(ADMIN_SERVICE_NAME, DELETE_USER_METHOD)
  private async deleteUser(
    payload: DeleteUserRequestDto,
  ): Promise<DeleteUserResponseDto> {
    return this.service.deleteUser(payload);
  }

  @GrpcMethod(ADMIN_SERVICE_NAME, DELETE_POST_METHOD)
  private async deletePost(
    payload: DeletePostRequestDto,
  ): Promise<DeletePostResponseDto> {
    return this.service.deletePost(payload);
  }
}
