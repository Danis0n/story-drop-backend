import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneByRequest,
  FindOneIdRequest,
  User,
} from './proto/user.pb';
import { UserMapper } from './mapper/user.mapper';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/requests.dto';
import { UserWithInclude } from '../prisma/utils/prisma.validate';

@Injectable()
export class UserService {
  @Inject(UserMapper)
  private readonly mapper: UserMapper;

  @Inject(UserRepository)
  private readonly repository: UserRepository;

  public async create(createUser: CreateUserDto): Promise<User> {
    const user: UserWithInclude = await this.repository.createUser(createUser);
    return this.mapper.mapToUserDto(user);
  }

  public async findAll(payload: FindAllRequest): Promise<FindAllResponse> {
    return null;
  }

  public async findOne(payload: FindOneByRequest): Promise<User> {
    return null;
  }

  public async findOneId(payload: FindOneIdRequest): Promise<User> {
    return null;
  }

  public async findOneSession(payload: FindOneIdRequest): Promise<User> {
    return {
      isAvatar: false,
      email: 'sood',
      info: null,
      isEnabled: true,
      isLocked: false,
      nickname: 'dans',
      roles: ['admin'],
      username: 'das',
      uuid: '123',
    };
  }
}
