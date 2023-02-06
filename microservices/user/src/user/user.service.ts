import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllResponse,
  FindAnyByRequest,
  FindAnyByResponse,
  FindOneIdRequest,
  FindOneResponse,
} from './proto/user.pb';
import { UserMapper } from './mapper/user.mapper';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/requests.dto';
import { UserWithRelationData } from '../prisma/utils/prisma.validate';

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

  public async findAnyExist(
    payload: FindAnyByRequest,
  ): Promise<FindAnyByResponse> {
    const foundEmail = await this.repository.isExistByEmail(payload.email);
    const foundUsername = await this.repository.isExistByUsername(
      payload.username,
    );

    return { foundByEmail: foundEmail, foundByUsername: foundUsername };
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
