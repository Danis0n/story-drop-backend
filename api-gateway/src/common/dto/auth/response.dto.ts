import {
  FindOneUserIdBySessionResponse,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  User,
} from '../../../modules/auth/auth.pb';
import { IsOptional } from 'class-validator';

export class LoginResponseDto implements LoginResponse {
  deviceId: string;
  isLogged: boolean;
  sessionId: string;
  user: User;
}

export class LogoutResponseDto implements LogoutResponse {
  isLoggedOut: boolean;
}

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
