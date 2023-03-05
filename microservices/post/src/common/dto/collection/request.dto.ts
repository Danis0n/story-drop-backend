import {
  CreateCollectionRequest,
  DeleteCollectionRequest,
  FindManyCollectionByNameRequest,
  FindOneCollectionByIdRequest,
  UpdateCollectionRequest,
} from '../../../proto/post.pb';
import { IsOptional } from 'class-validator';

export class CreateCollectionRequestDto implements CreateCollectionRequest {
  name: string;
  userId: string;
  @IsOptional()
  postIds: string[];
}

export class UpdateCollectionRequestDto implements UpdateCollectionRequest {
  collectionId: string;
  @IsOptional()
  name: string;
  @IsOptional()
  isHidden: boolean;
  @IsOptional()
  postIdsDelete: string[];
  @IsOptional()
  postIdsInsert: string[];
}

export class DeleteCollectionRequestDto implements DeleteCollectionRequest {
  collectionId: string;
}

export class FindOneCollectionByIdRequestDto
  implements FindOneCollectionByIdRequest
{
  collectionId: string;
}

export class FindManyCollectionByNameRequestDto
  implements FindManyCollectionByNameRequest
{
  name: string;
}
