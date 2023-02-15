import {
  Body,
  Controller,
  Delete,
  Inject,
  OnModuleInit,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ADMIN_SERVICE_NAME, AdminServiceClient } from './admin.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  DeletePostResponseDto,
  DeleteUserResponseDto,
  RoleGuard,
  Roles,
  UpdateBannedDto,
  UpdateBannedResponseDto,
  UpdateEnabledDto,
  UpdateEnabledResponseDto,
} from '../common';
import { Observable } from 'rxjs';

@Controller('api/admin')
export class AdminController implements OnModuleInit {
  private adminServiceClient: AdminServiceClient;

  @Inject(ADMIN_SERVICE_NAME)
  private readonly adminClient: ClientGrpc;

  public onModuleInit(): void {
    this.adminServiceClient =
      this.adminClient.getService<AdminServiceClient>(ADMIN_SERVICE_NAME);
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Put('ban/:id')
  private async updateBan(
    @Param('id') uuid: string,
    @Body() { state }: UpdateBannedDto,
  ): Promise<Observable<UpdateBannedResponseDto>> {
    return this.adminServiceClient.updateBanned({
      uuid: uuid,
      state: state,
    });
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Put('enable/:id')
  private async updateEnable(
    @Param('id') uuid: string,
    @Body() { state }: UpdateEnabledDto,
  ): Promise<Observable<UpdateEnabledResponseDto>> {
    return this.adminServiceClient.updateEnabled({
      uuid: uuid,
      state: state,
    });
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Delete('user/:id')
  private async deleteUser(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteUserResponseDto>> {
    return this.adminServiceClient.deleteUser({ uuid: uuid });
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Delete('post/:id')
  private async deletePost(
    @Param('id') uuid: string,
  ): Promise<Observable<DeletePostResponseDto>> {
    return this.adminServiceClient.deletePost({ uuid: uuid });
  }
}