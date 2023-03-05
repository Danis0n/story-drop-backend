import {
  CreateCharacterRequest,
  DeleteCharacterRequest,
  FindManyCharacterByNameRequest,
  FindOneCharacterByFandomRequest,
  FindOneCharacterByIdRequest,
  FindOneCharacterByParingRequest,
  UpdateCharacterRequest,
} from '../../../proto/post.pb';
import { IsOptional } from 'class-validator';

export class CreateCharacterRequestDto implements CreateCharacterRequest {
  name: string;
  fandomId: string;
}

export class UpdateCharacterRequestDto implements UpdateCharacterRequest {
  characterId: string;
  @IsOptional()
  name: string;
}

export class DeleteCharacterRequestDto implements DeleteCharacterRequest {
  characterId: string;
}

export class FindOneCharacterByIdRequestDto
  implements FindOneCharacterByIdRequest
{
  characterId: string;
}

export class FindOneCharacterByParingRequestDto
  implements FindOneCharacterByParingRequest
{
  paringId: string;
}

export class FindOneCharacterByFandomRequestDto
  implements FindOneCharacterByFandomRequest
{
  fandomId: string;
}

export class FindManyCharacterByNameRequestDto
  implements FindManyCharacterByNameRequest
{
  name: string;
}
