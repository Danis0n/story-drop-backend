import {
  CreateChapterRequest,
  DeleteChapterRequest,
  FindManyChapterByPostIdRequest,
  FindOneChapterByIdRequest,
  IsOwnerChapterRequest,
  UpdateChapterRequest,
} from '../../../modules/post/post.pb';
import { IsOptional } from 'class-validator';

export class CreateChapterRequestDto implements CreateChapterRequest {
  @IsOptional()
  userId: string;
  name: string;
  @IsOptional()
  notes: string;
  postId: string;
  @IsOptional()
  text: string;
  @IsOptional()
  isHidden: boolean;
}

export class UpdateChapterRequestDto implements UpdateChapterRequest {
  name: string;
  @IsOptional()
  chapterId: string;
  @IsOptional()
  notes: string;
  @IsOptional()
  text: string;
  userId: string;
  @IsOptional()
  isHidden: boolean;
}

export class DeleteChapterRequestDto implements DeleteChapterRequest {
  chapterId: string;
}

export class FindOneChapterByIdRequestDto implements FindOneChapterByIdRequest {
  chapterId: string;
}

export class FindManyChapterByPostIdRequestDto
  implements FindManyChapterByPostIdRequest
{
  postId: string;
}

export class IsOwnerChapterRequestDto implements IsOwnerChapterRequest {
  chapterId: string;
  userId: string;
}
