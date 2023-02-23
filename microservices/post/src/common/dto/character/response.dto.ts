import {
  CreateCharacterResponse,
  DeleteCharacterResponse,
  FindOneCharacterByIdResponse,
  UpdateCharacterResponse,
} from '../../../post/post.pb';
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
