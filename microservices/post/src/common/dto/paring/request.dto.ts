import {
  CreateParingRequest,
  DeleteParingRequest,
  FindOneParingByIdRequest,
  UpdateParingRequest,
} from '../../../modules/post/proto/post.pb';

export class CreateParingRequestDto implements CreateParingRequest {
  name: string;
  characterIds: string[];
}

export class UpdateParingRequestDto implements UpdateParingRequest {
  name: string;
  paringId: string;
  insertCharacterIds: string[];
  removeCharacterIds: string[];
}

export class DeleteParingRequestDto implements DeleteParingRequest {
  paringId: string;
}

export class FindOneParingByIdRequestDto implements FindOneParingByIdRequest {
  paringId: string;
}
