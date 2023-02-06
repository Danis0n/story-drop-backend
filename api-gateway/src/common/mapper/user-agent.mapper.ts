import * as DeviceDetector from 'device-detector-js';

interface UserAgentData {
  os: string;
  client: string;
  device: string;
}

export function serializeUserAgentToString(userAgent: string): string {
  const { os, device, client } = serializeUserAgent(userAgent);

  return String(os + ' ' + device + ' ' + client)
    .replace(/undefined/g, '')
    .trim();
}

export function serializeUserAgent(userAgent: string): UserAgentData {
  const deviceDetector = new DeviceDetector();
  const parser: DeviceDetector.DeviceDetectorResult =
    deviceDetector.parse(userAgent);

  const os: string | null = parser.os?.name;
  const device: string | null =
    parser.device?.type + ' ' + parser.device?.brand;
  const client: string | null = parser.client.type + ' ' + parser.client.name;

  return { client: os, device: device, os: client };
}
