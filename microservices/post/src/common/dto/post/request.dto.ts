import {
  CreatePostRequest,
  DeletePostRequest,
  FindOnePostByIdRequest,
  IsOwnerRequest,
  UpdatePostRequest,
} from '../../../proto/post.pb';

export class CreatePostRequestDto implements CreatePostRequest {
  characterIds: string[];
  dedication: string;
  description: string;
  fandomIds: string[];
  genreIds: string[];
  name: string;
  paringIds: string[];
  tagIds: string[];
  userId: string;
}

export class UpdatePostRequestDto implements UpdatePostRequest {
  dedication: string;
  description: string;
  isHidden: boolean;
  name: string;
  postId: string;
  statusId: string;
  userId: string;
}

export class DeletePostRequestDto implements DeletePostRequest {
  postId: string;
  userId: string;
}

export class FindOnePostByIdRequestDto implements FindOnePostByIdRequest {
  uuid: string;
}

export class IsOwnerRequestDto implements IsOwnerRequest {
  postId: string;
  userId: string;
}
