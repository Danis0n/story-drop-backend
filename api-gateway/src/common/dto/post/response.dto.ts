import {
  CreatePostResponse,
  DeletePostResponse,
  FindOnePostResponse,
  IsOwnerResponse,
  UpdatePostResponse,
} from '../../../modules/post/post.pb';
import { PostDto } from './post.dto';

export class CreatePostResponseDto implements CreatePostResponse {
  success: boolean;
  postId: string;
}

export class UpdatePostResponseDto implements UpdatePostResponse {
  success: boolean;
  postId: string;
}

export class DeletePostResponseDto implements DeletePostResponse {
  success: boolean;
}

export class FindOnePostResponseDto implements FindOnePostResponse {
  post: PostDto;
  success: boolean;
}

export class IsOwnerResponseDto implements IsOwnerResponse {
  success: boolean;
}
