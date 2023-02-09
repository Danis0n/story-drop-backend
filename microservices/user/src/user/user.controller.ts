import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from './proto/user.pb';
import {
  CREATE_USER_METHOD,
  CreateUserDto,
  DELETE_METHOD,
  DeleteRequestDto,
  DeleteResponseDto,
  FIND_ALL_METHOD,
  FIND_ANY_EXIST_BY_METHOD,
  FIND_AVATAR_BY_USER_METHOD,
  FIND_ONE_ID_METHOD,
  FIND_ONE_ROLES_METHOD,
  FIND_ONE_USERNAME_METHOD,
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
  UPDATE_AVATAR_METHOD,
  UPDATE_METHOD,
  UpdateAvatarRequestDto,
  UpdateAvatarResponseDto,
  UpdateRequestDto,
  UpdateResponseDto,
} from '../common';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, CREATE_USER_METHOD)
  private async create(payload: CreateUserDto): Promise<FindOneResponseDto> {
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
  private async findAvatar(
    payload: FindAvatarByUserRequestDto,
  ): Promise<FindAvatarResponseDto> {
    return this.service.findAvatar(payload);
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

  @GrpcMethod(USER_SERVICE_NAME, FIND_ONE_ROLES_METHOD)
  private async findOneRoles(
    payload: FindOneIdRequestDto,
  ): Promise<FindOneRolesResponseDto> {
    return this.service.findOneRoles(payload);
  }
}
