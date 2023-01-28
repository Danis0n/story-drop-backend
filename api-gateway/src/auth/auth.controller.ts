import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Session,
  InternalServerErrorException,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated/is-authenticated.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Session() session: Record<string, any>) {
    console.log(session.id);
    return session;
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
