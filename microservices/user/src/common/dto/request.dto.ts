import {
  DeleteRequest,
  FindAnyByRequest,
  FindAvatarByUserRequest,
  FindOneIdRequest,
  FindOneUsernameRequest,
  FindPasswordIdRequest,
  UpdateBannedRequest,
  UpdateEnabledRequest,
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
  uuid: string;
  @IsOptional()
  contact: string;
  @IsOptional()
  nickname: string;
  @IsOptional()
  text: string;
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

export class UpdateBannedRequestDto implements UpdateBannedRequest {
  state: boolean;
  uuid: string;
}

export class UpdateEnabledRequestDto implements UpdateEnabledRequest {
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
