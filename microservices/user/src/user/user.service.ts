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
  UserWithRoleRelationData,
  FindOneUsernameRequestDto,
  FindOneUsernameResponseDto,
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

  public async findOneId({
    uuid,
  }: FindOneIdRequestDto): Promise<FindOneResponseDto> {
    const user: UserWithRelationData = await this.repository.findOneId(uuid);

    return { user: this.mapper.mapToUserDto(user) };
  }

  public async findOneRoles({
    uuid,
  }: FindOneIdRequestDto): Promise<FindOneRolesResponseDto> {
    const user: UserWithRoleRelationData = await this.repository.findRolesId(
      uuid,
    );

    const roles: string[] = user.sd_role_user.map((role) => {
      return role.role.role_name;
    });

    return { roles: roles };
  }

  public async updateAvatar(
    payload: UpdateAvatarRequestDto,
  ): Promise<UpdateAvatarResponseDto> {
    return { success: false };
  }

  public async findAvatar({
    uuid,
  }: FindAvatarByUserRequestDto): Promise<FindAvatarResponseDto> {
    return { avatar: null };
  }

  public async delete({ uuid }: DeleteRequestDto): Promise<DeleteResponseDto> {
    return { success: false };
  }

  public async update(payload: UpdateRequestDto): Promise<UpdateResponseDto> {
    return { user: null };
  }

  public async findOneUsername({
    username,
  }: FindOneUsernameRequestDto): Promise<FindOneUsernameResponseDto> {
    const user: UserWithRelationData = await this.repository.findOneUsername(
      username,
    );
    if (!user) return { hashedPassword: null, isFound: false, user: null };

    return {
      isFound: true,
      hashedPassword: user.password,
      user: this.mapper.mapToUserDto(user),
    };
  }
}
