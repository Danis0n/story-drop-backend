import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '../common';
import { UserRepository } from '../common';
import { UserWithRelationData } from '../common';
import {
  CreateUserDto,
  FindAllResponseDto,
  FindAnyByRequestDto,
  FindAnyByResponseDto,
  FindOneIdRequestDto,
  FindOneResponseDto,
} from '../common';

@Injectable()
export class UserService {
  @Inject(UserMapper)
  private readonly mapper: UserMapper;

  @Inject(UserRepository)
  private readonly repository: UserRepository;

  public async create(createUser: CreateUserDto): Promise<FindOneResponseDto> {
    const user: UserWithRelationData = await this.repository.createUser(
      createUser,
    );
    return { user: this.mapper.mapToUserDto(user) };
  }

  public async findAll(): Promise<FindAllResponseDto> {
    const users: UserWithRelationData[] = await this.repository.findAll();
    return { users: this.mapper.mapArrayToUserDto(users) };
  }

  public async findAnyExist(
    payload: FindAnyByRequestDto,
  ): Promise<FindAnyByResponseDto> {
    const foundEmail = !!payload.email
      ? await this.repository.isExistByEmail(payload.email)
      : false;
    const foundUsername = !!payload.username
      ? await this.repository.isExistByUsername(payload.username)
      : false;

    return { foundByEmail: foundEmail, foundByUsername: foundUsername };
  }

  public async findOneId(
    payload: FindOneIdRequestDto,
  ): Promise<FindOneResponseDto> {
    const user: UserWithRelationData = await this.repository.findOneId(
      payload.uuid,
    );

    return { user: this.mapper.mapToUserDto(user) };
  }

  public async findOneSession(
    payload: FindOneIdRequestDto,
  ): Promise<FindOneResponseDto> {
    return { user: undefined };
  }
}
