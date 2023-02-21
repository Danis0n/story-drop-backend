import {
  CreateGenreResponse,
  UpdateGenreResponse,
  DeleteGenreResponse,
  FindOneGenreByIdResponse,
} from '../../../post/post.pb';
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
