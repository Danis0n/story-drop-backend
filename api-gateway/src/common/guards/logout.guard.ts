import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LogoutResponse } from '../../auth/auth.pb';
import { COOKIE_DEVICE, COOKIE_SESSION } from '../../config';
import { cleanCookie } from '../service';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly authService: AuthService) {}

  private getSession(request: any) {
    const device = request.cookies[COOKIE_DEVICE];
    const session = request.cookies[COOKIE_SESSION];

    return { device: device, session: session };
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { device, session } = this.getSession(request);

    const { isLoggedOut }: LogoutResponse = await this.authService.logout({
      deviceId: device,
      sessionId: session,
    });

    if (!isLoggedOut) throw new NotFoundException('сессия не найдена');

    cleanCookie(response);
    return true;
  }
}
