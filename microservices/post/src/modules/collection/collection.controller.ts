import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import { CollectionService } from './collection.service';
import {
  CreateCollectionRequestDto,
  CreateCollectionResponseDto,
  DeleteCollectionRequestDto,
  DeleteCollectionResponseDto,
  FindOneCollectionByIdRequestDto,
  FindOneCollectionByIdResponseDto,
  UpdateCollectionRequestDto,
  UpdateCollectionResponseDto,
} from '../../common';

@Controller('collection')
export class CollectionController {
  @Inject(CollectionService)
  private readonly s: CollectionService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateCollection')
  private async create(
    payload: CreateCollectionRequestDto,
  ): Promise<CreateCollectionResponseDto> {
    return this.s.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneCollectionById')
  private async findId(
    payload: FindOneCollectionByIdRequestDto,
  ): Promise<FindOneCollectionByIdResponseDto> {
    return this.s.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateCollection')
  private async update(
    payload: UpdateCollectionRequestDto,
  ): Promise<UpdateCollectionResponseDto> {
    return this.s.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteCollection')
  private async delete(
    payload: DeleteCollectionRequestDto,
  ): Promise<DeleteCollectionResponseDto> {
    return this.s.delete(payload);
  }
}
