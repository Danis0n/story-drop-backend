import { Age, Tag } from '../../../post/post.pb';

export class AgeDto implements Age {
  ageId: string;
  color: string;
  name: string;
}

export class TagDto implements Tag {
  age: AgeDto;
  name: string;
  tagId: string;
}
