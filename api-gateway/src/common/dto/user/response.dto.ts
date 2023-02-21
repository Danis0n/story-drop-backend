import {
  DeleteResponse,
  FindAllResponse,
  FindAnyByResponse,
  FindAvatarResponse,
  FindOneUserResponse,
  FindOneRolesResponse,
  FindOneUsernameResponse,
  UpdateAvatarResponse,
  UpdateResponse,
} from '../../../user/user.pb';
import { UserDto } from './user.dto';
import { ImageDto } from './user.dto';

export class FindOneRolesResponseDto implements FindOneRolesResponse {
  roles: string[];
}

export class UpdateAvatarResponseDto implements UpdateAvatarResponse {
  success: boolean;
}

export class UpdateResponseDto implements UpdateResponse {
  user: UserDto;
  success: boolean;
}

export class DeleteResponseDto implements DeleteResponse {
  success: boolean;
}

export class FindAllResponseDto implements FindAllResponse {
  users: UserDto[];
}

export class FindOneUserResponseDto implements FindOneUserResponse {
  user: UserDto;
}

export class FindOneUsernameResponseDto implements FindOneUsernameResponse {
  hashedPassword: string;
  user: UserDto;
  isFound: boolean;
}

export class FindAvatarResponseDto implements FindAvatarResponse {
  avatar: ImageDto;
}

export class FindAnyByResponseDto implements FindAnyByResponse {
  foundByEmail: boolean;
  foundByUsername: boolean;
}
