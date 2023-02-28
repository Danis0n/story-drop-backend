import {
  CreateParingRequest,
  DeleteParingRequest,
  FindOneParingByIdRequest,
  UpdateParingRequest,
} from '../../../modules/post/post.pb';
import { IsOptional } from 'class-validator';

export class CreateParingRequestDto implements CreateParingRequest {
  name: string;
  characterIds: string[];
}

export class UpdateParingRequestDto implements UpdateParingRequest {
  paringId: string;
  @IsOptional()
  name: string;
  @IsOptional()
  insertCharacterIds: string[];
  @IsOptional()
  removeCharacterIds: string[];
}

export class DeleteParingRequestDto implements DeleteParingRequest {
  paringId: string;
}

export class FindOneParingByIdRequestDto implements FindOneParingByIdRequest {
  paringId: string;
}
