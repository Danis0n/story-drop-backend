import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AuthGuard,
  IsAuthenticatedGuard,
  LogoutGuard,
  RegisterRequestDto,
  RegisterResponseDto,
  User,
  UserId,
  UserIdValidateGuard,
} from '../../common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/auth')
export class AuthController implements OnModuleInit {
  private serviceClient: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @UseGuards(AuthGuard)
  @Post('login')
  private login(@Session() session: Record<string, any>, @User() user: any) {
    session.user = user;
    return { sessionId: session.id, session: session.user };
  }

  @UseGuards(IsAuthenticatedGuard, LogoutGuard)
  @Post('logout')
  private async logout() {
    return {
      logout: true,
    };
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Post('/register')
  private async register(
    @Body() payload: RegisterRequestDto,
  ): Promise<Observable<RegisterResponseDto>> {
    return this.serviceClient.register(payload);
  }

  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @Get('protected')
  private protected(@UserId() uuid: string) {
    console.log(uuid);
    return {
      message: 'This route is protected against unauthenticated users!',
    };
  }
}
