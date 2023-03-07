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
  CreateCollectionRequestDto,
  CreateCollectionResponseDto,
  DeleteCollectionResponseDto,
  FindManyCollectionByNameRequestDto,
  FindManyCollectionByNameResponseDto,
  FindManyCollectionByUserIdRequestDto,
  FindManyCollectionByUserIdResponseDto,
  FindOneCollectionByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateCollectionRequestDto,
  UpdateCollectionResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/collection')
export class CollectionController implements OnModuleInit {
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
    @Body() payload: CreateCollectionRequestDto,
  ): Promise<Observable<CreateCollectionResponseDto>> {
    return this.serviceClient.createCollection(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneCollectionByIdResponseDto>> {
    return this.serviceClient.findOneCollectionById({ collectionId: uuid });
  }

  @Get('/user')
  private async findUserId(
    @Query() payload: FindManyCollectionByUserIdRequestDto,
  ): Promise<Observable<FindManyCollectionByUserIdResponseDto>> {
    return this.serviceClient.findManyCollectionByUserId(payload);
  }

  @Get('/name')
  private async findNameMany(
    @Query() payload: FindManyCollectionByNameRequestDto,
  ): Promise<Observable<FindManyCollectionByNameResponseDto>> {
    return this.serviceClient.findManyCollectionByName(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Patch('/:id')
  private async update(
    @Param('id') uuid: string,
    @Body() payload: UpdateCollectionRequestDto,
  ): Promise<Observable<UpdateCollectionResponseDto>> {
    payload.collectionId = uuid;
    return this.serviceClient.updateCollection(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteCollectionResponseDto>> {
    return this.serviceClient.deleteCollection({ collectionId: uuid });
  }
}
