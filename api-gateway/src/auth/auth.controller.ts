import {
  Controller,
  Get,
  Post,
  UseGuards,
  Session,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { AuthGuard } from '../common';
import { IsAuthenticatedGuard } from '../common';
import { User } from '../common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('api/auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly authClient: ClientGrpc;

  public onModuleInit(): void {
    this.authServiceClient =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @UseGuards(AuthGuard)
  @Post('login')
  private login(@Session() session: Record<string, any>, @User() user: any) {
    session.user = user;
    return { sessionId: session.id, session: session.user };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post('logout')
  private async logout() {
    return {
      logout: true,
    };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('protected')
  private protected() {
    return {
      message: 'This route is protected against unauthenticated users!',
    };
  }
}
