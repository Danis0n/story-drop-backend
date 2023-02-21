import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
  DeleteCollectionRequest,
  FindOneCollectionByIdRequest,
} from '../../../post/post.pb';

export class CreateCollectionRequestDto implements CreateCollectionRequest {
  name: string;
}

export class UpdateCollectionRequestDto implements UpdateCollectionRequest {
  collectionId: string;
  name: string;
}

export class DeleteCollectionRequestDto implements DeleteCollectionRequest {
  collectionId: string;
}

export class FindOneCollectionByIdRequestDto
  implements FindOneCollectionByIdRequest
{
  collectionId: string;
}
