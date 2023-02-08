import {
  FindOneUserIdBySessionRequest,
  LoginRequest,
  ValidateRequest,
  ValidateResponse,
} from '../../auth/proto/auth.pb';

export class LoginRequestDto implements LoginRequest {
  ip: string;
  password: string;
  sessionExpire: number;
  sessionId: string;
  userAgent: string;
  username: string;
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
