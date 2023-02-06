import {
  CreateImage,
  CreateUser,
  DeleteRequest,
  DeleteResponse,
  FindAllResponse,
  FindAnyByRequest,
  FindAnyByResponse,
  FindOneResponse,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
  UpdateRequest,
  User,
  UserInfo,
} from '../../user/user.pb';
import { IsOptional } from 'class-validator';

export class FindAnyByRequestDto implements FindAnyByRequest {
  @IsOptional()
  email: string;
  @IsOptional()
  username: string;
}

export class FindAnyByResponseDto implements FindAnyByResponse {
  foundByEmail: boolean;
  foundByUsername: boolean;
}

export class CreateImageDto implements CreateImage {
  buffer: Uint8Array;
  fieldName: string;
  mimetype: string;
  originalName: string;
  size: number;
}

export class UpdateAvatarRequestDto implements UpdateAvatarRequest {
  uuid: string;
  @IsOptional()
  delete: boolean;
  @IsOptional()
  image: CreateImageDto;
}

export class UpdateAvatarDto {
  @IsOptional()
  delete: boolean;
}

export class UpdateAvatarResponseDto implements UpdateAvatarResponse {
  success: boolean;
}

export class UpdateDto {
  @IsOptional()
  contact: string;
  @IsOptional()
  nickname: string;
  @IsOptional()
  text: string;
}

export class UpdateRequestDto implements UpdateRequest {
  uuid: string;
  @IsOptional()
  contact: string;
  @IsOptional()
  nickname: string;
  @IsOptional()
  text: string;
}

export class FindAllResponseDto implements FindAllResponse {
  users: UserDto[];
}

export class FindOneResponseDto implements FindOneResponse {
  user: UserDto;
}

export class UserDto implements User {
  email: string;
  info: UserInfoDto;
  isAvatar: boolean;
  isEnabled: boolean;
  isLocked: boolean;
  nickname: string;
  roles: string[];
  username: string;
  uuid: string;
}

export class UserInfoDto implements UserInfo {
  contact: string;
  text: string;
}

export class CreateUserDto implements CreateUser {
  contact: string;
  email: string;
  nickname: string;
  password: string;
  text: string;
  username: string;
}

export class DeleteRequestDto implements DeleteRequest {
  uuid: string;
}

export class DeleteResponseDto implements DeleteResponse {
  success: boolean;
}
