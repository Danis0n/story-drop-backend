import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as DeviceDetector from 'device-detector-js';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const deviceDetector = new DeviceDetector();

    console.log(deviceDetector.parse(request.get('user-agent')));
    console.log(request.socket.remoteAddress);
    return !!request.user;
  }
}
