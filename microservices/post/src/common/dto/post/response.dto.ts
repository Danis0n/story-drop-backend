import {
  CreatePostResponse,
  DeletePostResponse,
  FindOnePostResponse,
  UpdatePostResponse,
} from '../../../proto/post.pb';
import { PostDto } from './post.dto';
import { IsOwnerRequestDto } from './request.dto';

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

export class IsOwnerResponseDto implements IsOwnerRequestDto {
  postId: string;
  userId: string;
}
