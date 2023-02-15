import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from './proto/user.pb';
import {
  CREATE_USER_METHOD,
  CreateUserRequestDto,
  DELETE_METHOD,
  DeleteRequestDto,
  DeleteResponseDto,
  FIND_ALL_METHOD,
  FIND_ANY_EXIST_BY_METHOD,
  FIND_AVATAR_BY_USER_METHOD,
  FIND_ONE_ID_METHOD,
  FIND_ONE_ROLES_METHOD,
  FIND_ONE_USERNAME_METHOD,
  FIND_PASSWORD_ID_METHOD,
  FindAllResponseDto,
  FindAnyByRequestDto,
  FindAnyByResponseDto,
  FindAvatarByUserRequestDto,
  FindAvatarResponseDto,
  FindOneIdRequestDto,
  FindOneResponseDto,
  FindOneRolesResponseDto,
  FindOneUsernameRequestDto,
  FindOneUsernameResponseDto,
  FindPasswordIdRequestDto,
  FindPasswordIdResponseDto,
  UPDATE_BANNED_METHOD,
  UPDATE_ENABLED_METHOD,
  UpdateBannedRequestDto,
  UpdateBannedResponseDto,
  UpdateEnabledRequestDto,
  UpdateEnabledResponseDto,
  UPDATE_AVATAR_METHOD,
  UPDATE_METHOD,
  UPDATE_PASSWORD_METHOD,
  UpdateAvatarRequestDto,
  UpdateAvatarResponseDto,
  UpdatePasswordRequestDto,
  UpdatePasswordResponseDto,
  UpdateRequestDto,
  UpdateResponseDto,
} from '../common';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, CREATE_USER_METHOD)
  private async create(
    payload: CreateUserRequestDto,
  ): Promise<FindOneResponseDto> {
    return this.service.create(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_ALL_METHOD)
  private async findAll(): Promise<FindAllResponseDto> {
    return this.service.findAll();
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_ANY_EXIST_BY_METHOD)
  private async findAnyExist(
    payload: FindAnyByRequestDto,
  ): Promise<FindAnyByResponseDto> {
    return this.service.findAnyExist(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_ONE_ID_METHOD)
  private async findOneId(
    payload: FindOneIdRequestDto,
  ): Promise<FindOneResponseDto> {
    return this.service.findOneId(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_ONE_USERNAME_METHOD)
  private async findOneUsername(
    payload: FindOneUsernameRequestDto,
  ): Promise<FindOneUsernameResponseDto> {
    return this.service.findOneUsername(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_AVATAR_BY_USER_METHOD)
  private async findAvatarId(
    payload: FindAvatarByUserRequestDto,
  ): Promise<FindAvatarResponseDto> {
    return this.service.findAvatarId(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_ONE_ROLES_METHOD)
  private async findOneRoles(
    payload: FindOneIdRequestDto,
  ): Promise<FindOneRolesResponseDto> {
    return this.service.findOneRoles(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, FIND_PASSWORD_ID_METHOD)
  private async findPasswordId(
    payload: FindPasswordIdRequestDto,
  ): Promise<FindPasswordIdResponseDto> {
    return this.service.findPasswordId(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, UPDATE_AVATAR_METHOD)
  private async updateAvatar(
    payload: UpdateAvatarRequestDto,
  ): Promise<UpdateAvatarResponseDto> {
    return this.service.updateAvatar(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, UPDATE_METHOD)
  private async update(payload: UpdateRequestDto): Promise<UpdateResponseDto> {
    return this.service.update(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, DELETE_METHOD)
  private async delete(payload: DeleteRequestDto): Promise<DeleteResponseDto> {
    return this.service.delete(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, UPDATE_BANNED_METHOD)
  private async updateBanned(
    payload: UpdateBannedRequestDto,
  ): Promise<UpdateBannedResponseDto> {
    return this.service.updateBanned(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, UPDATE_ENABLED_METHOD)
  private async updateEnabled(
    payload: UpdateEnabledRequestDto,
  ): Promise<UpdateEnabledResponseDto> {
    return this.service.updateEnabled(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, UPDATE_PASSWORD_METHOD)
  private async updatePassword(
    payload: UpdatePasswordRequestDto,
  ): Promise<UpdatePasswordResponseDto> {
    return this.service.updatePassword(payload);
  }
}
