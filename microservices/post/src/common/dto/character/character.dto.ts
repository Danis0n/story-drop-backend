import { Character } from '../../../proto/post.pb';

export class CharacterDto implements Character {
  characterId: string;
  name: string;
}
