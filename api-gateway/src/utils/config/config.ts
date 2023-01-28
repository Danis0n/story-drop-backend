import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '../../user/user.pb';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const UserServiceProto: ClientProviderOptions = {
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: USER_PACKAGE_NAME,
    protoPath: 'node_modules/story-drop-proto/proto/user.proto',
  },
};

export const sessionSettings = {
  name: 'user-session',
  secret: 'dskdaskdaskdas',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,
  },
};
