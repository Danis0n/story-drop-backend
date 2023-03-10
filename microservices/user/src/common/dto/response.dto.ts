import {
  DeleteResponse,
  FindAllResponse,
  FindAnyByResponse,
  FindAvatarResponse,
  FindOneResponse,
  FindOneRolesResponse,
  FindOneUsernameResponse,
  FindPasswordIdResponse,
  UpdateBannedResponse,
  UpdateEnabledResponse,
  UpdateAvatarResponse,
  UpdatePasswordResponse,
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
  success: boolean;
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

export class UpdateBannedResponseDto implements UpdateBannedResponse {
  success: boolean;
}

export class UpdateEnabledResponseDto implements UpdateEnabledResponse {
  success: boolean;
}

export class FindPasswordIdResponseDto implements FindPasswordIdResponse {
  hashedPassword: string;
  success: boolean;
}

export class UpdatePasswordResponseDto implements UpdatePasswordResponse {
  success: boolean;
}
