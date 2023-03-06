import {
  CreateChapterRequest,
  DeleteChapterRequest,
  FindManyChapterByPostIdRequest,
  FindOneChapterByIdRequest,
  UpdateChapterRequest,
} from '../../../proto/post.pb';

export class CreateChapterRequestDto implements CreateChapterRequest {
  name: string;
  notes: string;
  postId: string;
  text: string;
  userId: string;
  isHidden: boolean;
}

export class UpdateChapterRequestDto implements UpdateChapterRequest {
  chapterId: string;
  notes: string;
  text: string;
  userId: string;
  name: string;
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
