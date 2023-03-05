import {
  CreateGenreResponse,
  DeleteGenreResponse,
  FindManyGenreByNameResponse,
  FindOneGenreByIdResponse,
  UpdateGenreResponse,
} from '../../../proto/post.pb';
import { GenreDto } from './genre.dto';

export class CreateGenreResponseDto implements CreateGenreResponse {
  genre: GenreDto;
  success: boolean;
}

export class UpdateGenreResponseDto implements UpdateGenreResponse {
  genre: GenreDto;
  success: boolean;
}

export class DeleteGenreResponseDto implements DeleteGenreResponse {
  success: boolean;
}

export class FindOneGenreByIdResponseDto implements FindOneGenreByIdResponse {
  genre: GenreDto;
  success: boolean;
}

export class FindManyGenreByNameResponseDto
  implements FindManyGenreByNameResponse
{
  genres: GenreDto[];
}
