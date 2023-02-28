import { Fandom } from '../../../modules/post/post.pb';

export class FandomDto implements Fandom {
  fandomId: string;
  name: string;
}
