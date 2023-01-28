import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, UserService } from '../user/user.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UserService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    console.log('serialize');
    done(null, user.username);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deserializeUser(username: string, done: Function) {
    console.log('deserialize');
    const user = this.usersService.findByUsername(username);

    if (!user) {
      return done(
        `Could not deserialize user: user with ${username} could not be found`,
        null,
      );
    }

    done(null, user);
  }
}
