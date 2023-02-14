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
  SetBannedRequestDto,
  SetEnabledRequestDto,
  SetBannedResponseDto,
  SetEnabledResponseDto,
  ImageMapper,
} from '../common';

@Injectable()
export class UserService {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  @Inject(ImageMapper)
  public readonly imageMapper: ImageMapper;

  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async create(createUser: CreateUserDto): Promise<FindOneResponseDto> {
    const user: UserWithRelationData = await this.userRepository.createUser(
      createUser,
    );

    return { user: this.userMapper.mapToUserDto(user) };
  }

  public async findAll(): Promise<FindAllResponseDto> {
    const users: UserWithRelationData[] = await this.userRepository.findAll();
    return { users: this.userMapper.mapArrayToUserDto(users) };
  }

  public async findAnyExist(
    payload: FindAnyByRequestDto,
  ): Promise<FindAnyByResponseDto> {
    const foundEmail = !!payload.email
      ? await this.userRepository.isExistByEmail(payload.email)
      : false;
    const foundUsername = !!payload.username
      ? await this.userRepository.isExistByUsername(payload.username)
      : false;

    return { foundByEmail: foundEmail, foundByUsername: foundUsername };
  }

  public async findOneId({
    uuid,
  }: FindOneIdRequestDto): Promise<FindOneResponseDto> {
    const user: UserWithRelationData = await this.userRepository.findOneId(
      uuid,
    );

    return { user: this.userMapper.mapToUserDto(user) };
  }

  public async findOneRoles({
    uuid,
  }: FindOneIdRequestDto): Promise<FindOneRolesResponseDto> {
    const user: UserWithRoleRelationData =
      await this.userRepository.findRolesId(uuid);

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
    const user = await this.userRepository.findOneIdWithAvatar(uuid);
    if (!user.image) return { avatar: null };

    const imageDto = this.imageMapper.mapToImageDto(user.image);
    return { avatar: imageDto };
  }

  public async delete({ uuid }: DeleteRequestDto): Promise<DeleteResponseDto> {
    const success = await this.userRepository.delete(uuid);
    return { success: success };
  }

  public async update(payload: UpdateRequestDto): Promise<UpdateResponseDto> {
    return { user: null };
  }

  public async findOneUsername({
    username,
  }: FindOneUsernameRequestDto): Promise<FindOneUsernameResponseDto> {
    const user: UserWithRelationData =
      await this.userRepository.findOneUsername(username);
    if (!user) return { hashedPassword: null, isFound: false, user: null };

    return {
      isFound: true,
      hashedPassword: user.password,
      user: this.userMapper.mapToUserDto(user),
    };
  }

  public async setBanned({
    state,
    uuid,
  }: SetBannedRequestDto): Promise<SetBannedResponseDto> {
    const user = await this.userRepository.updateBlocked(state, uuid);
    const success = user.is_blocked === state;

    return { success: success };
  }

  public async setEnabled({
    state,
    uuid,
  }: SetEnabledRequestDto): Promise<SetEnabledResponseDto> {
    const user = await this.userRepository.updateEnabled(state, uuid);
    const success = user.is_enabled === state;

    return { success: success };
  }
}
