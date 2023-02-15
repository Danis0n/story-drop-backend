import {
  DeleteRequest,
  FindAnyByRequest,
  FindAvatarByUserRequest,
  FindOneIdRequest,
  FindOneUsernameRequest,
  FindPasswordIdRequest,
  SetBannedRequest,
  SetEnabledRequest,
  UpdateAvatarRequest,
  UpdatePasswordRequest,
  UpdateRequest,
} from '../../user/proto/user.pb';
import { IsOptional } from 'class-validator';
import { CreateImageDto } from './user.dto';

export class FindAnyByRequestDto implements FindAnyByRequest {
  @IsOptional()
  email: string;
  @IsOptional()
  username: string;
}

export class UpdateAvatarRequestDto implements UpdateAvatarRequest {
  uuid: string;
  @IsOptional()
  delete: boolean;
  @IsOptional()
  image: CreateImageDto;
}

export class FindAvatarByUserRequestDto implements FindAvatarByUserRequest {
  uuid: string;
}

export class UpdateRequestDto implements UpdateRequest {
  contact: string;
  nickname: string;
  text: string;
  uuid: string;
}

export class DeleteRequestDto implements DeleteRequest {
  uuid: string;
}

export class FindOneIdRequestDto implements FindOneIdRequest {
  uuid: string;
}

export class FindOneUsernameRequestDto implements FindOneUsernameRequest {
  username: string;
}

export class SetBannedRequestDto implements SetBannedRequest {
  state: boolean;
  uuid: string;
}

export class SetEnabledRequestDto implements SetEnabledRequest {
  state: boolean;
  uuid: string;
}

export class UpdatePasswordRequestDto implements UpdatePasswordRequest {
  hashedPassword: string;
  uuid: string;
}

export class FindPasswordIdRequestDto implements FindPasswordIdRequest {
  uuid: string;
}
