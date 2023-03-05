import {
  CreateCharacterResponse,
  DeleteCharacterResponse,
  FindManyCharacterByNameResponse,
  FindOneCharacterByFandomResponse,
  FindOneCharacterByIdResponse,
  FindOneCharacterByParingResponse,
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

export class FindOneCharacterByParingResponseDto
  implements FindOneCharacterByParingResponse
{
  character: CharacterDto;
  success: boolean;
}

export class FindOneCharacterByFandomResponseDto
  implements FindOneCharacterByFandomResponse
{
  character: CharacterDto;
  success: boolean;
}

export class FindManyCharacterByNameResponseDto
  implements FindManyCharacterByNameResponse
{
  characters: CharacterDto[];
}
