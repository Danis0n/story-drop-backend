import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AdminServiceProto } from '../common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ClientsModule.register([AdminServiceProto]),
    AuthModule,
    UserModule,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
