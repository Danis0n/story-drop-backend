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
  CreateCollectionRequestDto,
  CreateCollectionResponseDto,
  DeleteCollectionResponseDto,
  FindOneCollectionByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateCollectionRequestDto,
  UpdateCollectionResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';

@Controller('collection')
export class CollectionController implements OnModuleInit {
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
    @Body() payload: CreateCollectionRequestDto,
  ): Promise<Observable<CreateCollectionResponseDto>> {
    return this.serviceClient.createCollection(payload);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneCollectionByIdResponseDto>> {
    return this.serviceClient.findOneCollectionById({ collectionId: uuid });
  }

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

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteCollectionResponseDto>> {
    return this.serviceClient.deleteCollection({ collectionId: uuid });
  }
}
