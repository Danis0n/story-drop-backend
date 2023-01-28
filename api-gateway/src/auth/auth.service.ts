import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  validateUser(username: string, password: string): User {
    const user = this.usersService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
