import {
  DeletePostRequest,
  DeleteUserRequest,
  UpdateBannedRequest,
  UpdateEnabledRequest,
} from '../../../admin/admin.pb';

export class DeleteUserRequestDto implements DeleteUserRequest {
  uuid: string;
}

export class DeletePostRequestDto implements DeletePostRequest {
  uuid: string;
}

export class UpdateEnabledRequestDto implements UpdateEnabledRequest {
  state: boolean;
  uuid: string;
}

export class UpdateBannedRequestDto implements UpdateBannedRequest {
  state: boolean;
  uuid: string;
}
