import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AdminService {
  public async updateBanned({
    uuid,
    state,
  }: UpdateBannedRequestDto): Promise<UpdateBannedResponseDto> {
    return { success: false };
  }

  public async updateEnabled({
    uuid,
    state,
  }: UpdateEnabledRequestDto): Promise<UpdateEnabledResponseDto> {
    return { success: false };
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
