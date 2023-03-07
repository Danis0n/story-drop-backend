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
  CreateFandomRequestDto,
  CreateFandomResponseDto,
  DeleteFandomResponseDto,
  FindManyFandomByNameRequestDto,
  FindManyFandomByNameResponseDto,
  FindOneFandomByCharacterRequestDto,
  FindOneFandomByCharacterResponseDto,
  FindOneFandomByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateFandomRequestDto,
  UpdateFandomResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/fandom')
export class FandomController implements OnModuleInit {
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
    @Body() payload: CreateFandomRequestDto,
  ): Promise<Observable<CreateFandomResponseDto>> {
    return this.serviceClient.createFandom(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneFandomByIdResponseDto>> {
    return this.serviceClient.findOneFandomById({ fandomId: uuid });
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('character')
  private async findCharacterId(
    @Query() payload: FindOneFandomByCharacterRequestDto,
  ): Promise<Observable<FindOneFandomByCharacterResponseDto>> {
    return this.serviceClient.findOneFandomByCharacter(payload);
  }

  @Get('name')
  private async findNameMany(
    @Query() payload: FindManyFandomByNameRequestDto,
  ): Promise<Observable<FindManyFandomByNameResponseDto>> {
    return this.serviceClient.findManyFandomByName(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
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

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteFandomResponseDto>> {
    return this.serviceClient.deleteFandom({ fandomId: uuid });
  }
}
