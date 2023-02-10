import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  DeviceRepository,
  FindOneUserIdBySessionRequestDto,
  FindOneUserIdBySessionResponseDto,
  FindOneUsernameResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutResponseDto,
  SessionRepository,
  ValidateRequestDto,
  ValidateResponseDto,
  validatePassword,
  RegisterRequestDto,
  RegisterResponseDto,
  FindAnyByResponseDto,
  FindOneResponseDto,
} from '../common';
import { USER_SERVICE_NAME, UserServiceClient } from './proto/user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'crypto';
import {
  handleCreateUserException,
  handleRegisterExceptions,
} from '../common/exception';

@Injectable()
export class AuthService implements OnModuleInit {
  @Inject(USER_SERVICE_NAME)
  private readonly userClient: ClientGrpc;

  private userServiceClient: UserServiceClient;

  @Inject(DeviceRepository)
  private readonly deviceRepository: DeviceRepository;

  @Inject(SessionRepository)
  private readonly sessionRepository: SessionRepository;

  public async onModuleInit(): Promise<void> {
    this.userServiceClient =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    console.log(payload);
    const { hashedPassword, user, isFound }: FindOneUsernameResponseDto =
      await firstValueFrom(
        this.userServiceClient.findOneUsername({ username: payload.username }),
      );
    if (!isFound)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    const isValidate = validatePassword(hashedPassword, payload.password);
    if (!isValidate)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    const device = await this.deviceRepository.create({
      deviceName: payload.deviceName,
      deviceType: payload.deviceType,
      uuid: randomUUID(),
      ipAddress: payload.ip,
    });

    if (!device)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    const session = await this.sessionRepository.create({
      sessionId: payload.sessionId,
      userId: user.uuid,
      deviceId: device.device_id,
    });

    if (!session)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    return {
      deviceId: device.device_id,
      isLogged: true,
      sessionId: session.session_id,
      user: user,
    };
  }

  // change ip-address in db if it's new
  public async validate(
    payload: ValidateRequestDto,
  ): Promise<ValidateResponseDto> {
    return { permission: false };
  }

  public async logout(payload: ValidateRequestDto): Promise<LogoutResponseDto> {
    return { isLoggedOut: false };
  }

  public async register(
    payload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const { foundByEmail, foundByUsername }: FindAnyByResponseDto =
      await firstValueFrom(
        this.userServiceClient.findAnyExistBy({
          username: payload.username,
          email: payload.email,
        }),
      );
    handleRegisterExceptions(foundByEmail, foundByUsername);

    const { user }: FindOneResponseDto = await firstValueFrom(
      this.userServiceClient.create(payload),
    );

    if (!user) handleCreateUserException();
    return { success: true, user: user };
  }

  public async findOneUserIdBySession(
    payload: FindOneUserIdBySessionRequestDto,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return { uuid: '' };
  }
}
