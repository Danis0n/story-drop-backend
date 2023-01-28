import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(@Inject(AuthService) public readonly authService: AuthService) {
    super();
  }
  // implement login
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return true;
  }
}
