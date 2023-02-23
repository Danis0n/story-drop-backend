import {
  CreateGenreRequest,
  DeleteGenreRequest,
  FindOneGenreByIdRequest,
  UpdateGenreRequest,
} from '../../../post/proto/post.pb';

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
