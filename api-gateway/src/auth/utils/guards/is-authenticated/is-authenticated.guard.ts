import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../../../auth.service';
import { ValidateResponse } from '../../../auth.pb';

// TODO : make a validation
@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  @Inject(AuthService) public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // TODO: implement cookie check and ip-address
    // change ip-address in db if it's new
    // if (false) {
    //   return false;
    // }

    // const { session, device, ip } = this.serializeCookie(request);

    // console.log(deviceDetector.parse(request.get('user-agent')));
    console.log(request.socket.remoteAddress);

    const response: ValidateResponse = await this.authService.validateUser(
      'sessionId',
      'deviceId',
      '',
    );

    return response.permission;
  }
}
