import {
  CreateFandomResponse,
  DeleteFandomResponse,
  FindOneFandomByIdResponse,
  UpdateFandomResponse,
} from '../../../post/proto/post.pb';
import { FandomDto } from './fandom.dto';

export class CreateFandomResponseDto implements CreateFandomResponse {
  fandom: FandomDto;
  success: boolean;
}

export class UpdateFandomResponseDto implements UpdateFandomResponse {
  fandom: FandomDto;
  success: boolean;
}

export class DeleteFandomResponseDto implements DeleteFandomResponse {
  success: boolean;
}

export class FindOneFandomByIdResponseDto implements FindOneFandomByIdResponse {
  fandom: FandomDto;
  success: boolean;
}
