import {
  DeletePostResponse,
  DeleteUserResponse,
  UpdateBannedResponse,
  UpdateEnabledResponse,
} from '../../../modules/admin/admin.pb';

export class DeletePostAdminResponseDto implements DeletePostResponse {
  success: boolean;
}

export class DeleteUserAdminResponseDto implements DeleteUserResponse {
  success: boolean;
}

export class UpdateBannedAdminResponseDto implements UpdateBannedResponse {
  success: boolean;
}

export class UpdateEnabledAdminResponseDto implements UpdateEnabledResponse {
  success: boolean;
}
