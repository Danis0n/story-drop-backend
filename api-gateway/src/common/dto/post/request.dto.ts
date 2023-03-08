import {
  CreatePostRequest,
  DeletePostRequest,
  FindOnePostByIdRequest,
  IsOwnerRequest,
  UpdatePostRequest,
} from '../../../modules/post/post.pb';
import { IsOptional } from 'class-validator';

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

export class UpdatePostDto {
  postId: string;
  @IsOptional()
  statusId: string;
  @IsOptional()
  dedication: string;
  @IsOptional()
  description: string;
  @IsOptional()
  isHidden: boolean;
  @IsOptional()
  name: string;
  @IsOptional()
  deleteGenres: string[];
  @IsOptional()
  deleteTags: string[];
  @IsOptional()
  insertGenres: string[];
  @IsOptional()
  insertTags: string[];
}

export class UpdatePostRequestDto implements UpdatePostRequest {
  postId: string;
  @IsOptional()
  statusId: string;
  @IsOptional()
  dedication: string;
  @IsOptional()
  description: string;
  @IsOptional()
  isHidden: boolean;
  @IsOptional()
  name: string;

  @IsOptional()
  deleteGenres: string[];
  @IsOptional()
  deleteTags: string[];
  @IsOptional()
  insertGenres: string[];
  @IsOptional()
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
