import { IsOptional } from 'class-validator';
import {
  CreateImage,
  CreateUser,
  DeleteRequest,
  DeleteResponse,
  FindAllResponse,
  FindAnyByRequest,
  FindAnyByResponse,
  FindAvatarByUserRequest,
  FindAvatarResponse,
  FindOneIdRequest,
  FindOneResponse,
  FindOneRolesResponse,
  Image,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
  UpdateRequest,
  UpdateResponse,
  User,
  UserInfo,
} from '../../user/proto/user.pb';

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

export class FindAvatarByUserRequestDto implements FindAvatarByUserRequest {
  uuid: string;
}

export class FindAvatarResponseDto implements FindAvatarResponse {
  avatar: ImageDto;
}

export class ImageDto implements Image {
  buffer: string;
  date: string;
  imageUuid: string;
  name: string;
}

export class UpdateAvatarResponseDto implements UpdateAvatarResponse {
  success: boolean;
}

export class UpdateRequestDto implements UpdateRequest {
  contact: string;
  nickname: string;
  text: string;
  uuid: string;
}

export class UpdateResponseDto implements UpdateResponse {
  user: UserDto;
}

export class DeleteRequestDto implements DeleteRequest {
  uuid: string;
}

export class DeleteResponseDto implements DeleteResponse {
  success: boolean;
}

export class FindAllResponseDto implements FindAllResponse {
  users: UserDto[];
}

export class FindOneIdRequestDto implements FindOneIdRequest {
  uuid: string;
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

export class FindOneRolesResponseDto implements FindOneRolesResponse {
  roles: string[];
}
