import {
  CreateTagRequest,
  DeleteTagRequest,
  FindOneTagByIdRequest,
  UpdateTagRequest,
} from '../../../proto/post.pb';

export class CreateTagRequestDto implements CreateTagRequest {
  name: string;
  ageId: string;
}

export class UpdateTagRequestDto implements UpdateTagRequest {
  name: string;
  tagId: string;
}

export class DeleteTagRequestDto implements DeleteTagRequest {
  tagId: string;
}

export class FindOneTagByIdRequestDto implements FindOneTagByIdRequest {
  tagId: string;
}
