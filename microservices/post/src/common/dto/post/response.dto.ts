import {
  CreatePostResponse,
  DeletePostResponse,
  FindOnePostResponse,
  UpdatePostResponse,
} from '../../../post/post.pb';
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

export class FindOnePostResponseDto implements FindOnePostResponse {
  post: PostDto;
  success: boolean;
}