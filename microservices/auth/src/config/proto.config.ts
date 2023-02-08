import { join } from 'path';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from '../auth/proto/auth.pb';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '../auth/proto/user.pb';

export const authServiceProto = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: protobufPackage,
    protoPath: join('node_modules/story-drop-proto/proto/auth.proto'),
  },
};

export const userServiceProto: ClientProviderOptions = {
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: USER_PACKAGE_NAME,
    protoPath: join('node_modules/story-drop-proto/proto/user.proto'),
  },
};
