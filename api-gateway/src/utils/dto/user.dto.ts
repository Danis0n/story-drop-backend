import {
  CreateUser,
  FindAllResponse,
  FindAnyByRequest,
  FindAnyByResponse,
  FindOneResponse,
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
