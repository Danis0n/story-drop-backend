export class CreateNewSessionDto {
  sessionId: string;
  deviceName: string;
  deviceType: string;
  sessionExpire: number;
  ip: string;
  userId: string;
}

export class SessionSuccessDto {
  deviceId: string;
  sessionId: string;
}
