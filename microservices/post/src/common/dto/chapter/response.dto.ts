import {
  CreateChapterResponse,
  DeleteChapterResponse,
  FindManyChapterByPostIdResponse,
  FindOneChapterByIdResponse,
  IsOwnerChapterResponse,
  UpdateChapterResponse,
} from '../../../proto/post.pb';
import { ChapterDto } from './chapter.dto';

export class CreateChapterResponseDto implements CreateChapterResponse {
  chapter: ChapterDto;
  success: boolean;
}

export class UpdateChapterResponseDto implements UpdateChapterResponse {
  chapter: ChapterDto;
  success: boolean;
}

export class DeleteChapterResponseDto implements DeleteChapterResponse {
  success: boolean;
}

export class FindOneChapterByIdResponseDto
  implements FindOneChapterByIdResponse
{
  chapter: ChapterDto;
  success: boolean;
}

export class FindManyChapterByPostIdResponseDto
  implements FindManyChapterByPostIdResponse
{
  chapters: ChapterDto[];
}

export class IsOwnerChapterResponseDto implements IsOwnerChapterResponse {
  success: boolean;
}
