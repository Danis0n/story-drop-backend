import {
  DeletePostResponse,
  DeleteUserResponse,
  UpdateBannedResponse,
  UpdateEnabledResponse,
} from '../../../admin/proto/admin.pb';

export class DeletePostResponseDto implements DeletePostResponse {
  success: boolean;
}

export class DeleteUserResponseDto implements DeleteUserResponse {
  success: boolean;
}

export class UpdateBannedResponseDto implements UpdateBannedResponse {
  success: boolean;
}

export class UpdateEnabledResponseDto implements UpdateEnabledResponse {
  success: boolean;
}
