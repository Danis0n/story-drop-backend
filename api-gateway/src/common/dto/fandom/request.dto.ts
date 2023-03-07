import {
  CreateFandomRequest,
  DeleteFandomRequest,
  FindManyFandomByNameRequest,
  FindOneFandomByCharacterRequest,
  FindOneFandomByIdRequest,
  UpdateFandomRequest,
} from '../../../modules/post/post.pb';

export class CreateFandomRequestDto implements CreateFandomRequest {
  name: string;
}

export class UpdateFandomRequestDto implements UpdateFandomRequest {
  fandomId: string;
  name: string;
}

export class DeleteFandomRequestDto implements DeleteFandomRequest {
  fandomId: string;
}

export class FindOneFandomByIdRequestDto implements FindOneFandomByIdRequest {
  fandomId: string;
}

export class FindOneFandomByCharacterRequestDto
  implements FindOneFandomByCharacterRequest
{
  characterId: string;
}

export class FindManyFandomByNameRequestDto
  implements FindManyFandomByNameRequest
{
  name: string;
}
