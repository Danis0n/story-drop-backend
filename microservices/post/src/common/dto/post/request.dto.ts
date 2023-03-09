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
  postId: string;
  dedication: string;
  description: string;
  isHidden: boolean;
  isFinished: boolean;
  name: string;
  deleteGenres: string[];
  deleteTags: string[];
  insertGenres: string[];
  insertTags: string[];
}

export class DeletePostRequestDto implements DeletePostRequest {
  postId: string;
}

export class FindOnePostByIdRequestDto implements FindOnePostByIdRequest {
  postId: string;
}

export class IsOwnerRequestDto implements IsOwnerRequest {
  postId: string;
  userId: string;
}
