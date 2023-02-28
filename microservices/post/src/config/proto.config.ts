import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from '../modules/post/proto/post.pb';

export const postServiceProto = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50054',
    package: protobufPackage,
    protoPath: join('node_modules/story-drop-proto/proto/post.proto'),
  },
};
