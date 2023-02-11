import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { COOKIE_LOGGED_IN, COOKIE_SESSION } from '../config';
import { UserService } from '../../user/user.service';
import {
  FindOneRolesResponseDto,
  FindOneUserIdBySessionResponseDto,
} from '../dto';

@Injectable()
export class RoleGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  @Inject(UserService)
  public readonly userService: UserService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const logged = request.cookies[COOKIE_LOGGED_IN];
    const session = request.cookies[COOKIE_SESSION];

    if (!Boolean(logged) || !session)
      throw new UnauthorizedException('Пользователь не авторизован');

    const { uuid }: FindOneUserIdBySessionResponseDto =
      await this.authService.findOneUserIdBySession(session);

    if (!uuid)
      throw new UnauthorizedException(
        'Пользователь не найден в сервисе аутентификации',
      );

    const { roles }: FindOneRolesResponseDto =
      await this.userService.findOneRoles(uuid);

    if (!roles)
      throw new UnauthorizedException(
        'Пользователь не найден в сервисе пользователей',
      );

    return roles.some((role) => requiredRoles.indexOf(role) >= 0);
  }
}
