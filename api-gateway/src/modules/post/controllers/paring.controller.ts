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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateParingRequestDto,
  CreateParingResponseDto,
  DeleteParingResponseDto,
  FindManyParingByCharacterRequestDto,
  FindManyParingByCharacterResponseDto,
  FindManyParingByNameRequestDto,
  FindManyParingByNameResponseDto,
  FindOneParingByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateParingRequestDto,
  UpdateParingResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/paring')
export class ParingController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(IsAuthenticatedGuard)
  @Post()
  private async create(
    @Body() payload: CreateParingRequestDto,
  ): Promise<Observable<CreateParingResponseDto>> {
    return this.serviceClient.createParing(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneParingByIdResponseDto>> {
    return this.serviceClient.findOneParingById({ paringId: uuid });
  }

  @Get('name')
  private async findNameMany(
    @Query() payload: FindManyParingByNameRequestDto,
  ): Promise<Observable<FindManyParingByNameResponseDto>> {
    return this.serviceClient.findManyParingByName(payload);
  }

  @Get('character')
  private async findCharacterId(
    @Query() payload: FindManyParingByCharacterRequestDto,
  ): Promise<Observable<FindManyParingByCharacterResponseDto>> {
    return this.serviceClient.findManyParingByCharacter(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
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

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteParingResponseDto>> {
    return this.serviceClient.deleteParing({ paringId: uuid });
  }
}
