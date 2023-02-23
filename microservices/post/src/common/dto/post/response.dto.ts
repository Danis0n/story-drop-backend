import {
  CreatePostResponse,
  DeletePostResponse,
  FindOneResponse,
  UpdatePostResponse,
} from '../../../post/proto/post.pb';
import { PostDto } from './post.dto';

export class CreatePostResponseDto implements CreatePostResponse {
  post: PostDto;
  success: boolean;
}

export class UpdatePostResponseDto implements UpdatePostResponse {
  post: PostDto;
  success: boolean;
}

export class DeletePostResponseDto implements DeletePostResponse {
  success: boolean;
}

export class FindOnePostResponseDto implements FindOneResponse {
  post: PostDto;
  success: boolean;
}
