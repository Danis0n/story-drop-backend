import { Character } from '../../../post/proto/post.pb';

export class CharacterDto implements Character {
  characterId: string;
  name: string;
}

export class CharacterPrismaDto {
  character_id: string;
  character_name: string;
}
