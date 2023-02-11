export class CreateSessionDto {
  sessionId: string;
  userId: string;
  deviceId: string;
  sessionExpire: number;
}
