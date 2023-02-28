import { ChapterRecord, Post } from '../../../modules/post/post.pb';
import { CharacterDto } from '../character';
import { FandomDto } from '../fandom';
import { GenreDto } from '../genre';
import { ParingDto } from '../paring';
import { TagDto } from '../tag';

export class PostDto implements Post {
  chapters: ChapterRecordDto[];
  characters: CharacterDto[];
  dateOfCreation: string;
  dedication: string;
  description: string;
  fandoms: FandomDto[];
  genres: GenreDto[];
  isHidden: boolean;
  isHiddenAdmin: boolean;
  name: string;
  parings: ParingDto[];
  postId: string;
  status: string;
  tags: TagDto[];
  userId: string;
}

export class ChapterRecordDto implements ChapterRecord {
  chapterId: string;
  dateOfCreation: string;
  name: string;
  number: string;
  postId: string;
}
