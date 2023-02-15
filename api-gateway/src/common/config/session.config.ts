import { COOKIE_MAX_AGE } from './constants';

export const sessionSettings = {
  name: 'user-session',
  secret: 'dskdaskdaskdas',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
  },
};
