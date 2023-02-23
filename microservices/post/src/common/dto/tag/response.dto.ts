import {
  CreateTagResponse,
  DeleteTagResponse,
  FindOneTagByIdResponse,
  UpdateTagResponse,
} from '../../../post/proto/post.pb';
import { TagDto } from './tag.dto';

export class CreateTagResponseDto implements CreateTagResponse {
  success: boolean;
  tag: TagDto;
}

export class UpdateTagResponseDto implements UpdateTagResponse {
  success: boolean;
  tag: TagDto;
}

export class DeleteTagResponseDto implements DeleteTagResponse {
  success: boolean;
}

export class FindOneTagByIdResponseDto implements FindOneTagByIdResponse {
  success: boolean;
  tag: TagDto;
}
