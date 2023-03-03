import { Genre } from '../../../proto/post.pb';

export class GenreDto implements Genre {
  genreId: string;
  name: string;
}
