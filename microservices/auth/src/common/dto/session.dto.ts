export class CreateSessionDto {
  sessionId: string;
  userId: string;
  device_name: string;
  device_type: string;
  ip_address: string;
}

export class CreateSessionWithDeviceDto {
  sessionId: string;
  userId: string;
  device_name: string;
  device_type: string;
  ip_address: string;
}
