import { Fandom } from '../../../proto/post.pb';

export class FandomDto implements Fandom {
  fandomId: string;
  name: string;
}
