import { IsOptional } from 'class-validator';
import {
  DeleteRequest,
  FindAnyByRequest,
  FindAvatarByUserRequest,
  FindOneUserIdRequest,
  FindOneUsernameRequest,
  UpdateAvatarRequest,
  UpdateRequest,
} from '../../../user/user.pb';
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

export class FindOneUserIdRequestDto implements FindOneUserIdRequest {
  uuid: string;
}

export class FindOneUsernameRequestDto implements FindOneUsernameRequest {
  username: string;
}
