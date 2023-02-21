import {
  CreateParingRequest,
  UpdateParingRequest,
  DeleteParingRequest,
  FindOneParingByIdRequest,
} from '../../../post/post.pb';

export class CreateParingRequestDto implements CreateParingRequest {
  name: string;
}

export class UpdateParingRequestDto implements UpdateParingRequest {
  name: string;
  paringId: string;
}

export class DeleteParingRequestDto implements DeleteParingRequest {
  paringId: string;
}

export class FindOneParingByIdRequestDto implements FindOneParingByIdRequest {
  paringId: string;
}
