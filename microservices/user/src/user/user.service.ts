import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneByRequest,
  FindOneIdRequest,
  FindOneResponse,
  User,
} from './proto/user.pb';
import { UserMapper } from './mapper/user.mapper';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/requests.dto';
import { UserWithRelationData } from '../prisma/utils/prisma.validate';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  @Inject(UserMapper)
  private readonly mapper: UserMapper;

  @Inject(UserRepository)
  private readonly repository: UserRepository;

  public async create(createUser: CreateUserDto): Promise<FindOneResponse> {
    const user: UserWithRelationData = await this.repository.createUser(
      createUser,
    );
    return { user: this.mapper.mapToUserDto(user) };
  }

  public async findAll(): Promise<FindAllResponse> {
    const users: UserWithRelationData[] = await this.repository.findAll();
    return { users: this.mapper.mapArrayToUserDto(users) };
  }

  public async findOne(payload: FindOneByRequest): Promise<FindOneResponse> {
    return null;
  }

  public async findOneId(payload: FindOneIdRequest): Promise<FindOneResponse> {
    return {
      user: {
        isAvatar: false,
        email: 'sood',
        info: null,
        isEnabled: true,
        isLocked: false,
        nickname: 'dans',
        roles: ['admin'],
        username: 'das',
        uuid: '123',
      },
    };
  }

  public async findOneSession(
    payload: FindOneIdRequest,
  ): Promise<FindOneResponse> {
    return {
      user: {
        isAvatar: false,
        email: 'sood',
        info: null,
        isEnabled: true,
        isLocked: false,
        nickname: 'dans',
        roles: ['admin'],
        username: 'das',
        uuid: '123',
      },
    };
  }
}
