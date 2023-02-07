import { FindOneUserIdBySessionResponse } from '../../auth/auth.pb';

export class FindOneUserIdBySessionResponseDto
  implements FindOneUserIdBySessionResponse
{
  uuid: string;
}
