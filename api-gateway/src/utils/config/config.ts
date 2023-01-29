import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '../../user/user.pb';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from '../../auth/auth.pb';
import { COOKIE_MAX_AGE } from './constants';

export const UserServiceProto: ClientProviderOptions = {
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: USER_PACKAGE_NAME,
    protoPath: 'node_modules/story-drop-proto/proto/user.proto',
  },
};

export const AuthServiceProto: ClientProviderOptions = {
  name: AUTH_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: AUTH_PACKAGE_NAME,
    protoPath: 'node_modules/story-drop-proto/proto/auth.proto',
  },
};

export const sessionSettings = {
  name: 'user-session',
  secret: 'dskdaskdaskdas',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
  },
};
