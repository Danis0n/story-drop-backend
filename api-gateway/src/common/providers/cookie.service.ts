import { LoginResponse } from '../../modules/auth/auth.pb';
import {
  COOKIE_DEVICE,
  COOKIE_LOGGED_IN,
  COOKIE_MAX_AGE,
  COOKIE_SESSION,
  COOKIE_UID,
} from '../constants';

export const setCookieLoginSuccess = (
  response: any,
  loginResponse: LoginResponse,
) => {
  response.user = loginResponse.user;

  response.cookie(COOKIE_DEVICE, loginResponse.deviceId, {
    maxAge: COOKIE_MAX_AGE,
  });
  response.cookie(COOKIE_LOGGED_IN, loginResponse.isLogged, {
    maxAge: COOKIE_MAX_AGE,
  });
  response.cookie(COOKIE_SESSION, loginResponse.sessionId, {
    maxAge: COOKIE_MAX_AGE,
  });
  response.cookie(COOKIE_UID, loginResponse.user.uuid, {
    maxAge: COOKIE_MAX_AGE,
  });
};

export const cleanResponseData = (response: any) => {
  response.user = null;

  response.cookie(COOKIE_DEVICE, '', {
    maxAge: 0,
  });
  response.cookie(COOKIE_LOGGED_IN, '', {
    maxAge: 0,
  });
  response.cookie(COOKIE_SESSION, '', {
    maxAge: 0,
  });
  response.cookie(COOKIE_UID, '', {
    maxAge: 0,
  });
};

export const getRequestAuthData = (request: any) => {
  const device = request.cookies[COOKIE_DEVICE];
  const session = request.cookies[COOKIE_SESSION];
  const logged = Boolean(request.cookies[COOKIE_LOGGED_IN]);
  const ip = request.socket.remoteAddress;

  return { device, logged, session, ip };
};

export const setCookieValidationFail = (response: any) => {
  response.cookie(COOKIE_DEVICE, '', {
    maxAge: 1,
  });
  response.cookie(COOKIE_LOGGED_IN, false, {
    maxAge: COOKIE_MAX_AGE,
  });
  response.cookie(COOKIE_UID, '', {
    maxAge: 0,
  });
};

export const setCookieValidationSuccess = (response: any) => {
  response.cookie(COOKIE_LOGGED_IN, true, {
    maxAge: COOKIE_MAX_AGE,
  });
};
