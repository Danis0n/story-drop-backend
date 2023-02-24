import {
  CreateCharacterRequest,
  DeleteCharacterRequest,
  FindOneCharacterByIdRequest,
  UpdateCharacterRequest,
} from '../../../post/post.pb';
import { IsOptional } from 'class-validator';

export class CreateCharacterRequestDto implements CreateCharacterRequest {
  name: string;
  fandomId: string;
}

export class UpdateCharacterRequestDto implements UpdateCharacterRequest {
  characterId: string;
  @IsOptional()
  name: string;
  @IsOptional()
  fandomId: string;
}

export class DeleteCharacterRequestDto implements DeleteCharacterRequest {
  characterId: string;
}

export class FindOneCharacterByIdRequestDto
  implements FindOneCharacterByIdRequest
{
  characterId: string;
}
