import {
  COOKIE_DEVICE,
  COOKIE_LOGGED_IN,
  COOKIE_MAX_AGE,
  COOKIE_SESSION,
} from '../config';
import { LoginResponse } from '../../auth/auth.pb';

// TODO : set folders for auth & user requests & responses

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

export const setLoginCookieFail = (response: any) => {
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
