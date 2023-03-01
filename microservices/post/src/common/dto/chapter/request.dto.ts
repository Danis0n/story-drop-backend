import {
  CreateChapterRequest,
  DeleteChapterRequest,
  FindOneChapterByIdRequest,
  UpdateChapterRequest,
} from '../../../modules/post/proto/post.pb';

export class CreateChapterRequestDto implements CreateChapterRequest {
  name: string;
  notes: string;
  postId: string;
  text: string;
  userId: string;
}

export class UpdateChapterRequestDto implements UpdateChapterRequest {
  chapterId: string;
  notes: string;
  text: string;
  userId: string;
  name: string;
}

export class DeleteChapterRequestDto implements DeleteChapterRequest {
  chapterId: string;
}

export class FindOneChapterByIdRequestDto implements FindOneChapterByIdRequest {
  chapterId: string;
}
