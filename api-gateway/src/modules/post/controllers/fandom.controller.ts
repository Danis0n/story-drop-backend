import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateFandomRequestDto,
  CreateFandomResponseDto,
  DeleteFandomResponseDto,
  FindOneFandomByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateFandomRequestDto,
  UpdateFandomResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';

@Controller('api/fandom')
export class FandomController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post()
  private async create(
    @Body() payload: CreateFandomRequestDto,
  ): Promise<Observable<CreateFandomResponseDto>> {
    return this.serviceClient.createFandom(payload);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneFandomByIdResponseDto>> {
    return this.serviceClient.findOneFandomById({ fandomId: uuid });
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Patch('/:id')
  private async update(
    @Param('id') uuid: string,
    @Body() payload: UpdateFandomRequestDto,
  ): Promise<Observable<UpdateFandomResponseDto>> {
    payload.fandomId = uuid;
    return this.serviceClient.updateFandom(payload);
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteFandomResponseDto>> {
    return this.serviceClient.deleteFandom({ fandomId: uuid });
  }
}
