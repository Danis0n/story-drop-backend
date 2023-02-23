import { Genre } from '../../../post/proto/post.pb';

export class GenreDto implements Genre {
  genreId: string;
  name: string;
}
