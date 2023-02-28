import { Fandom } from '../../../modules/post/proto/post.pb';

export class FandomDto implements Fandom {
  fandomId: string;
  name: string;
}
