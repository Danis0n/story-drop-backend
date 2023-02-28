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
  DeletePostAdminResponseDto,
  DeleteUserAdminResponseDto,
  RoleGuard,
  Roles,
  UpdateBannedDto,
  UpdateBannedAdminResponseDto,
  UpdateEnabledDto,
  UpdateEnabledAdminResponseDto,
} from '../../common';
import { Observable } from 'rxjs';

@Controller('api/admin')
export class AdminController implements OnModuleInit {
  private serviceClient: AdminServiceClient;

  @Inject(ADMIN_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<AdminServiceClient>(ADMIN_SERVICE_NAME);
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Put('ban/:id')
  private async updateBan(
    @Param('id') uuid: string,
    @Body() { state }: UpdateBannedDto,
  ): Promise<Observable<UpdateBannedAdminResponseDto>> {
    return this.serviceClient.updateBanned({
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
  ): Promise<Observable<UpdateEnabledAdminResponseDto>> {
    return this.serviceClient.updateEnabled({
      uuid: uuid,
      state: state,
    });
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Delete('user/:id')
  private async deleteUser(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteUserAdminResponseDto>> {
    return this.serviceClient.deleteUser({ uuid: uuid });
  }

  @Roles('Admin')
  @UseGuards(RoleGuard)
  @Delete('post/:id')
  private async deletePost(
    @Param('id') uuid: string,
  ): Promise<Observable<DeletePostAdminResponseDto>> {
    return this.serviceClient.deletePost({ uuid: uuid });
  }
}
