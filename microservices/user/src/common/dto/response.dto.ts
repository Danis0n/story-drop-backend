import {
  DeleteResponse,
  FindAllResponse,
  FindAnyByResponse,
  FindAvatarResponse,
  FindOneResponse,
  FindOneRolesResponse,
  UpdateAvatarResponse,
  UpdateResponse,
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

export class FindAvatarResponseDto implements FindAvatarResponse {
  avatar: ImageDto;
}

export class FindAnyByResponseDto implements FindAnyByResponse {
  foundByEmail: boolean;
  foundByUsername: boolean;
}
