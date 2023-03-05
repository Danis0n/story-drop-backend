import {
  CreateParingResponse,
  DeleteParingResponse,
  FindManyParingByCharacterResponse,
  FindManyParingByNameResponse,
  FindOneParingByIdResponse,
  UpdateParingResponse,
} from '../../../proto/post.pb';
import { ParingDto } from './paring.dto';

export class CreateParingResponseDto implements CreateParingResponse {
  paring: ParingDto;
  success: boolean;
}

export class UpdateParingResponseDto implements UpdateParingResponse {
  paring: ParingDto;
  success: boolean;
}

export class DeleteParingResponseDto implements DeleteParingResponse {
  success: boolean;
}

export class FindOneParingByIdResponseDto implements FindOneParingByIdResponse {
  paring: ParingDto;
  success: boolean;
}

export class FindManyParingByCharacterResponseDto
  implements FindManyParingByCharacterResponse
{
  parings: ParingDto[];
}

export class FindManyParingByNameResponseDto
  implements FindManyParingByNameResponse
{
  parings: ParingDto[];
}
