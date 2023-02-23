import {
  CreateChapterResponse,
  UpdateChapterResponse,
  DeleteChapterResponse,
  FindOneChapterByIdResponse,
} from '../../../post/post.pb';
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