import {
  FindOneUserIdBySessionResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../auth/auth.pb';
import { UserDto } from './user.dto';
import { IsOptional } from 'class-validator';

export class FindOneUserIdBySessionResponseDto
  implements FindOneUserIdBySessionResponse
{
  uuid: string;
}

export class RegisterRequestDto implements RegisterRequest {
  contact: string;
  email: string;
  nickname: string;
  password: string;
  @IsOptional()
  text: string;
  @IsOptional()
  username: string;
}

export class RegisterResponseDto implements RegisterResponse {
  success: boolean;
  user: UserDto;
}
