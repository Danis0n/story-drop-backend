import {
  DeletePostRequest,
  DeleteUserRequest,
  UpdateBannedRequest,
  UpdateEnabledRequest,
} from '../../../modules/admin/admin.pb';

export class DeleteUserAdminRequestDto implements DeleteUserRequest {
  uuid: string;
}

export class DeletePostAdminRequestDto implements DeletePostRequest {
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

export class UpdateBannedDto {
  state: boolean;
}

export class UpdateEnabledDto {
  state: boolean;
}
