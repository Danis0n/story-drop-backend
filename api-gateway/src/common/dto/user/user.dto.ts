import { IsOptional } from 'class-validator';
import {
  CreateImage,
  Image,
  UserInfo,
  User,
  CreateUserRequest,
} from '../../../modules/user/user.pb';

export class CreateImageDto implements CreateImage {
  buffer: Uint8Array;
  fieldName: string;
  mimetype: string;
  originalName: string;
  size: number;
}

export class ImageDto implements Image {
  buffer: string;
  date: string;
  imageUuid: string;
  name: string;
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

export class CreateUserDto implements CreateUserRequest {
  contact: string;
  email: string;
  nickname: string;
  password: string;
  @IsOptional()
  text: string;
  @IsOptional()
  username: string;
}

export class UpdateDto {
  @IsOptional()
  contact: string;
  @IsOptional()
  nickname: string;
  @IsOptional()
  text: string;
}

export class UpdateAvatarDto {
  @IsOptional()
  delete: boolean;
}
