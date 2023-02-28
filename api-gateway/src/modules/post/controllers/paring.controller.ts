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
  CreateParingRequestDto,
  CreateParingResponseDto,
  DeleteParingResponseDto,
  FindOneParingByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateParingRequestDto,
  UpdateParingResponseDto,
} from '../../common';
import { Observable } from 'rxjs';

@Controller('paring')
export class ParingController implements OnModuleInit {
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
    @Body() payload: CreateParingRequestDto,
  ): Promise<Observable<CreateParingResponseDto>> {
    return this.serviceClient.createParing(payload);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneParingByIdResponseDto>> {
    return this.serviceClient.findOneParingById({ paringId: uuid });
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Patch('/:id')
  private async update(
    @Param('id') uuid: string,
    @Body() payload: UpdateParingRequestDto,
  ): Promise<Observable<UpdateParingResponseDto>> {
    payload.paringId = uuid;
    return this.serviceClient.updateParing(payload);
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteParingResponseDto>> {
    return this.serviceClient.deleteParing({ paringId: uuid });
  }
}
