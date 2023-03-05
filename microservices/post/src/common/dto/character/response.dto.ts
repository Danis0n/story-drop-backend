import {
  CreateCharacterResponse,
  DeleteCharacterResponse,
  FindManyCharacterByFandomResponse,
  FindManyCharacterByNameResponse,
  FindManyCharacterByParingResponse,
  FindOneCharacterByIdResponse,
  UpdateCharacterResponse,
} from '../../../proto/post.pb';
import { CharacterDto } from './character.dto';

export class CreateCharacterResponseDto implements CreateCharacterResponse {
  character: CharacterDto;
  success: boolean;
}

export class DeleteCharacterResponseDto implements DeleteCharacterResponse {
  success: boolean;
}

export class FindOneCharacterByIdResponseDto
  implements FindOneCharacterByIdResponse
{
  character: CharacterDto;
  success: boolean;
}

export class UpdateCharacterResponseDto implements UpdateCharacterResponse {
  character: CharacterDto;
  success: boolean;
}

export class FindManyCharacterByParingResponseDto
  implements FindManyCharacterByParingResponse
{
  characters: CharacterDto[];
}

export class FindManyCharacterByFandomResponseDto
  implements FindManyCharacterByFandomResponse
{
  characters: CharacterDto[];
}

export class FindManyCharacterByNameResponseDto
  implements FindManyCharacterByNameResponse
{
  characters: CharacterDto[];
}
