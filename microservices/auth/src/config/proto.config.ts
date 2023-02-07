import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from '../auth/proto/auth.pb';

export const authServiceProto = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: protobufPackage,
    protoPath: join('node_modules/story-drop-proto/proto/auth.proto'),
  },
};
