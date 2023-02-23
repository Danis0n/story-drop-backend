import { Collection } from '../../../post/proto/post.pb';

export class CollectionDto implements Collection {
  collectionId: string;
  isHidden: boolean;
  name: string;
  userId: string;
}
