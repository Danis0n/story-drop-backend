import {
  CreateTagRequest,
  UpdateTagRequest,
  DeleteTagRequest,
  FindOneTagByIdRequest,
} from '../../../post/post.pb';

export class CreateTagRequestDto implements CreateTagRequest {
  name: string;
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
