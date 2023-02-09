import * as DeviceDetector from 'device-detector-js';

interface UserAgentData {
  os: string;
  client: string;
  device: string;
}

export interface serializeUserAgentData {
  deviceType: string;
  deviceName: string;
}

export function serializeUserAgentToString(
  userAgent: string,
): serializeUserAgentData {
  const { os, device, client } = serializeUserAgent(userAgent);

  const deviceType = String(os + ' ' + device)
    .replace(/undefined/g, '')
    .trim();
  const deviceName = client.replace(/undefined/g, '').trim();

  return { deviceName: deviceName, deviceType: deviceType };
}

export function serializeUserAgent(userAgent: string): UserAgentData {
  const deviceDetector = new DeviceDetector();
  const parser: DeviceDetector.DeviceDetectorResult =
    deviceDetector.parse(userAgent);

  const os: string | null = parser.os?.name;
  const deviceType: string | null = parser.device?.type;
  const client: string | null = parser.client.type + ' ' + parser.client.name;

  return { client: client, device: deviceType, os: os };
}
