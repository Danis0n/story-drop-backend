import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Session,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from './utils/guards/local-auth/auth.guard';
import { IsAuthenticatedGuard } from './utils/guards/is-authenticated/is-authenticated.guard';
import { User } from './utils/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard)
  @Post('login')
  login(@Session() session: Record<string, any>, @User() user: any) {
    console.log(user);
    session.user = user;
    return { sessionId: session.id, session };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post('logout')
  async logout(@Request() request) {
    const logoutError = await new Promise((resolve) =>
      request.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
    );

    if (logoutError) {
      console.error(logoutError);

      throw new InternalServerErrorException('Could not log out user');
    }

    return {
      logout: true,
    };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('protected')
  protected() {
    return {
      message: 'This route is protected against unauthenticated users!',
    };
  }
}
