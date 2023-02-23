import { Fandom } from '../../../post/proto/post.pb';

export class FandomDto implements Fandom {
  fandomId: string;
  name: string;
}
