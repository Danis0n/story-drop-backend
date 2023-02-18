import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '../user/user.pb';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from '../auth/auth.pb';
import { ADMIN_PACKAGE_NAME, ADMIN_SERVICE_NAME } from '../admin/admin.pb';
import { POST_PACKAGE_NAME, POST_SERVICE_NAME } from '../post/post.pb';

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

export const AdminServiceProto: ClientProviderOptions = {
  name: ADMIN_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50053',
    package: ADMIN_PACKAGE_NAME,
    protoPath: 'node_modules/story-drop-proto/proto/admin.proto',
  },
};

export const PostServiceProto: ClientProviderOptions = {
  name: POST_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50054',
    package: POST_PACKAGE_NAME,
    protoPath: 'node_modules/story-drop-proto/proto/post.proto',
  },
};
