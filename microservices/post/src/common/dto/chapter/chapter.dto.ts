import { Chapter } from '../../../modules/post/proto/post.pb';

export class ChapterDto implements Chapter {
  chapterId: string;
  dateOfCreation: string;
  name: string;
  notes: string;
  number: string;
  postId: string;
  text: string;
}
