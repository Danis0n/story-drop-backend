import {
  CreateGenreRequest,
  DeleteGenreRequest,
  FindManyGenreByNameRequest,
  FindOneGenreByIdRequest,
  UpdateGenreRequest,
} from '../../../proto/post.pb';

export class CreateGenreRequestDto implements CreateGenreRequest {
  name: string;
}

export class UpdateGenreRequestDto implements UpdateGenreRequest {
  genreId: string;
  name: string;
}

export class DeleteGenreRequestDto implements DeleteGenreRequest {
  genreId: string;
}

export class FindOneGenreByIdRequestDto implements FindOneGenreByIdRequest {
  genreId: string;
}

export class FindManyGenreByNameRequestDto
  implements FindManyGenreByNameRequest
{
  name: string;
}
