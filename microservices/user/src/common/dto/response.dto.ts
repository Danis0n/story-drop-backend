import {
  DeleteResponse,
  FindAllResponse,
  FindAnyByResponse,
  FindAvatarResponse,
  FindOneResponse,
  FindOneRolesResponse,
  FindOneUsernameResponse,
  SetBannedResponse,
  SetEnabledResponse,
  UpdateAvatarResponse,
  UpdateResponse,
  User,
} from '../../user/proto/user.pb';
import { ImageDto, UserDto } from './user.dto';

export class FindOneRolesResponseDto implements FindOneRolesResponse {
  roles: string[];
}

export class UpdateAvatarResponseDto implements UpdateAvatarResponse {
  success: boolean;
}

export class UpdateResponseDto implements UpdateResponse {
  user: UserDto;
}

export class DeleteResponseDto implements DeleteResponse {
  success: boolean;
}

export class FindAllResponseDto implements FindAllResponse {
  users: UserDto[];
}

export class FindOneResponseDto implements FindOneResponse {
  user: UserDto;
}

export class FindOneUsernameResponseDto implements FindOneUsernameResponse {
  hashedPassword: string;
  user: User;
  isFound: boolean;
}

export class FindAvatarResponseDto implements FindAvatarResponse {
  avatar: ImageDto;
}

export class FindAnyByResponseDto implements FindAnyByResponse {
  foundByEmail: boolean;
  foundByUsername: boolean;
}

export class SetBannedResponseDto implements SetBannedResponse {
  success: boolean;
}

export class SetEnabledResponseDto implements SetEnabledResponse {
  success: boolean;
}
