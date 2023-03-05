import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import { CollectionService } from './collection.service';
import {
  CreateCollectionRequestDto,
  CreateCollectionResponseDto,
  DeleteCollectionRequestDto,
  DeleteCollectionResponseDto,
  FindManyCollectionByNameRequestDto,
  FindManyCollectionByNameResponseDto,
  FindOneCollectionByIdRequestDto,
  FindOneCollectionByIdResponseDto,
  UpdateCollectionRequestDto,
  UpdateCollectionResponseDto,
} from '../../common';

@Controller('collection')
export class CollectionController {
  @Inject(CollectionService)
  private readonly cs: CollectionService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateCollection')
  private async create(
    payload: CreateCollectionRequestDto,
  ): Promise<CreateCollectionResponseDto> {
    return this.cs.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneCollectionById')
  private async findId(
    payload: FindOneCollectionByIdRequestDto,
  ): Promise<FindOneCollectionByIdResponseDto> {
    return this.cs.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindManyCollectionByName')
  private async findName(
    payload: FindManyCollectionByNameRequestDto,
  ): Promise<FindManyCollectionByNameResponseDto> {
    return this.cs.findName(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateCollection')
  private async update(
    payload: UpdateCollectionRequestDto,
  ): Promise<UpdateCollectionResponseDto> {
    return this.cs.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteCollection')
  private async delete(
    payload: DeleteCollectionRequestDto,
  ): Promise<DeleteCollectionResponseDto> {
    return this.cs.delete(payload);
  }
}
