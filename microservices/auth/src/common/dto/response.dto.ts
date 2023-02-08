import {
  FindOneUserIdBySessionResponse,
  LoginResponse,
  LogoutResponse,
} from '../../auth/proto/auth.pb';
import { User } from '../../auth/proto/user.pb';

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
