import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from '../../admin/proto/admin.pb';
import {
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '../../admin/proto/user.pb';

export const adminServiceProto = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50053',
    package: protobufPackage,
    protoPath: join('node_modules/story-drop-proto/proto/admin.proto'),
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

// export const postServiceProto: ClientProviderOptions = {
//   name: POST_SERVICE_NAME,
//   transport: Transport.GRPC,
//   options: {
//     url: '0.0.0.0:50054',
//     package: POST_PACKAGE_NAME,
//     protoPath: join('node_modules/story-drop-proto/proto/post.proto'),
//   },
// };
