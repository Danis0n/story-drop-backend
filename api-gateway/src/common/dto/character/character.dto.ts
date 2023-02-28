import { Character } from '../../../modules/post/post.pb';

export class CharacterDto implements Character {
  characterId: string;
  name: string;
}
