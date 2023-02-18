import { LoginResponse } from '../../auth/auth.pb';
import {
  COOKIE_DEVICE,
  COOKIE_LOGGED_IN,
  COOKIE_MAX_AGE,
  COOKIE_SESSION,
} from '../constants';

export const setLoginCookieSuccess = (
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
};

export const cleanCookie = (response: any) => {
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
};

export const getCookieValidate = (request: any) => {
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
};

export const setCookieLoginTrue = (response: any) => {
  response.cookie(COOKIE_LOGGED_IN, true, {
    maxAge: COOKIE_MAX_AGE,
  });
};
