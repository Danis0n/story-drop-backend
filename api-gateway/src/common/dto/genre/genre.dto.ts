import { Genre } from '../../../modules/post/post.pb';

export class GenreDto implements Genre {
  genreId: string;
  name: string;
}
