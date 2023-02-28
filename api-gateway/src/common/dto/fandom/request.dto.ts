import {
  CreateFandomRequest,
  UpdateFandomRequest,
  DeleteFandomRequest,
  FindOneFandomByIdRequest,
} from '../../../modules/post/post.pb';

export class CreateFandomRequestDto implements CreateFandomRequest {
  name: string;
}

export class UpdateFandomRequestDto implements UpdateFandomRequest {
  fandomId: string;
  name: string;
}

export class DeleteFandomRequestDto implements DeleteFandomRequest {
  fandomId: string;
}

export class FindOneFandomByIdRequestDto implements FindOneFandomByIdRequest {
  fandomId: string;
}
