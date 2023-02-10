import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  hashPassword,
  validatePassword,
  handleCreateUserException,
  handleRegisterExceptions,
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
  RegisterRequestDto,
  RegisterResponseDto,
  FindAnyByResponseDto,
  FindOneResponseDto,
  SessionSuccessDto,
  CreateNewSessionDto,
} from '../common';
import { USER_SERVICE_NAME, UserServiceClient } from './proto/user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'crypto';

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
    const { hashedPassword, user, isFound }: FindOneUsernameResponseDto =
      await firstValueFrom(
        this.userServiceClient.findOneUsername({ username: payload.username }),
      );
    if (!isFound)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    const isValidate = validatePassword(hashedPassword, payload.password);
    if (!isValidate)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    const { deviceId, sessionId }: SessionSuccessDto =
      await this.updateLoginData({
        ip: payload.ip,
        userId: user.uuid,
        deviceName: payload.deviceName,
        deviceType: payload.deviceType,
        sessionId: payload.sessionId,
      });

    const isSuccess = !!deviceId && !!sessionId;
    if (!isSuccess)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    return {
      deviceId: deviceId,
      isLogged: true,
      sessionId: sessionId,
      user: user,
    };
  }

  private async updateLoginData(
    payload: CreateNewSessionDto,
  ): Promise<SessionSuccessDto> {
    const oldDevice = await this.deviceRepository.findOneNameType(
      payload.deviceName,
      payload.deviceType,
      payload.ip,
    );

    if (oldDevice) await this.deviceRepository.delete(oldDevice.device_id);

    const device = await this.deviceRepository.create({
      deviceName: payload.deviceName,
      deviceType: payload.deviceType,
      uuid: randomUUID(),
      ipAddress: payload.ip,
    });

    if (!device) return { deviceId: null, sessionId: null };

    const session = await this.sessionRepository.create({
      sessionId: payload.sessionId,
      userId: payload.userId,
      deviceId: device.device_id,
    });

    return { deviceId: device.device_id, sessionId: session.session_id };
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

    payload.password = hashPassword(payload.password);
    const { user }: FindOneResponseDto = await firstValueFrom(
      this.userServiceClient.create(payload),
    );

    if (!user) handleCreateUserException();
    return { success: true, user: user };
  }

  // change ip-address in db if it's new
  public async validate(
    payload: ValidateRequestDto,
  ): Promise<ValidateResponseDto> {
    return { permission: false };
  }

  public async findOneUserIdBySession(
    payload: FindOneUserIdBySessionRequestDto,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return { uuid: '' };
  }
}
