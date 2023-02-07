import { Inject, Injectable } from '@nestjs/common';
import {
  DeleteRequestDto,
  FindAvatarByUserRequestDto,
  UpdateAvatarRequestDto,
  UpdateRequestDto,
  UserMapper,
  CreateUserDto,
  FindAllResponseDto,
  FindAnyByRequestDto,
  FindAnyByResponseDto,
  FindOneIdRequestDto,
  FindOneResponseDto,
  UserRepository,
  UserWithRelationData,
  UpdateAvatarResponseDto,
  FindAvatarResponseDto,
  DeleteResponseDto,
  UpdateResponseDto,
  FindOneRolesResponseDto,
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
    return { user: null };
  }

  public async updateAvatar(
    payload: UpdateAvatarRequestDto,
  ): Promise<UpdateAvatarResponseDto> {
    return { success: false };
  }

  public async findAvatar(
    payload: FindAvatarByUserRequestDto,
  ): Promise<FindAvatarResponseDto> {
    return { avatar: null };
  }

  public async delete(payload: DeleteRequestDto): Promise<DeleteResponseDto> {
    return { success: false };
  }

  public async update(payload: UpdateRequestDto): Promise<UpdateResponseDto> {
    return { user: null };
  }

  public async findOneRoles(
    payload: FindOneIdRequestDto,
  ): Promise<FindOneRolesResponseDto> {
    return { roles: ['Admin', 'User'] };
  }
}
