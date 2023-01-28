import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from '../../user/proto/user.pb';

export const userServiceProto = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: protobufPackage,
    protoPath: join('node_modules/story-drop-proto/proto/user.proto'),
  },
};
