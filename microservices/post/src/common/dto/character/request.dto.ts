import {
  CreateCharacterRequest,
  DeleteCharacterRequest,
  FindOneCharacterByIdRequest,
  UpdateCharacterRequest,
} from '../../../post/proto/post.pb';

export class CreateCharacterRequestDto implements CreateCharacterRequest {
  name: string;
}

export class UpdateCharacterRequestDto implements UpdateCharacterRequest {
  characterId: string;
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
