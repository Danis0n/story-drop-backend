import {
  FindOneUserIdBySessionRequest,
  LoginRequest,
  LogoutRequest,
  RegisterResponse,
  ValidateRequest,
  ValidateResponse,
} from '../../../auth/proto/auth.pb';
import { UserDto } from '../user.dto';

export class LogoutRequestDto implements LogoutRequest {
  deviceId: string;
  sessionId: string;
}

export class LoginRequestDto implements LoginRequest {
  ip: string;
  password: string;
  sessionExpire: number;
  sessionId: string;
  username: string;
  deviceName: string;
  deviceType: string;
}

export class ValidateRequestDto implements ValidateRequest {
  deviceId: string;
  ip: string;
  sessionId: string;
}

export class ValidateResponseDto implements ValidateResponse {
  permission: boolean;
}

export class FindOneUserIdBySessionRequestDto
  implements FindOneUserIdBySessionRequest
{
  session: string;
}

export class RegisterResponseDto implements RegisterResponse {
  success: boolean;
  user: UserDto;
}
