import {
  CreateCollectionResponse,
  UpdateCollectionResponse,
  DeleteCollectionResponse,
  FindOneCollectionByIdResponse,
} from '../../../post/post.pb';
import { CollectionDto } from './collection.dto';

export class CreateCollectionResponseDto implements CreateCollectionResponse {
  collection: CollectionDto;
  success: boolean;
}

export class UpdateCollectionResponseDto implements UpdateCollectionResponse {
  collection: CollectionDto;
  success: boolean;
}

export class DeleteCollectionResponseDto implements DeleteCollectionResponse {
  success: boolean;
}

export class FindOneCollectionByIdResponseDto
  implements FindOneCollectionByIdResponse
{
  collection: CollectionDto;
  success: boolean;
}
