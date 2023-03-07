import {
  CreateChapterRequest,
  DeleteChapterRequest,
  FindManyChapterByPostIdRequest,
  FindOneChapterByIdRequest,
  UpdateChapterRequest,
} from '../../../modules/post/post.pb';
import { IsOptional } from 'class-validator';

export class CreateChapterRequestDto implements CreateChapterRequest {
  name: string;
  @IsOptional()
  notes: string;
  postId: string;
  @IsOptional()
  text: string;
  userId: string;
  @IsOptional()
  isHidden: boolean;
}

export class UpdateChapterRequestDto implements UpdateChapterRequest {
  name: string;
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
