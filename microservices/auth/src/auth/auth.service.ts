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
  LogoutRequestDto,
} from '../common';
import { USER_SERVICE_NAME, UserServiceClient } from './proto/user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'crypto';

// TODO: implement schedule microservice, which have control over expire sessions

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

    const isValidate = await validatePassword(hashedPassword, payload.password);
    if (!isValidate)
      return { deviceId: null, isLogged: false, sessionId: null, user: null };

    const { deviceId, sessionId }: SessionSuccessDto =
      await this.updateLoginData({
        ip: payload.ip,
        userId: user.uuid,
        deviceName: payload.deviceName,
        deviceType: payload.deviceType,
        sessionId: payload.sessionId,
        sessionExpire: payload.sessionExpire,
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

  public async logout(payload: LogoutRequestDto): Promise<LogoutResponseDto> {
    const session = await this.sessionRepository.findOneId(payload.sessionId);
    if (!session) return { isLoggedOut: false };

    await this.sessionRepository.delete(session.session_id);
    await this.deviceRepository.delete(session.device_id);

    return { isLoggedOut: true };
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

    payload.password = await hashPassword(payload.password);
    const { user }: FindOneResponseDto = await firstValueFrom(
      this.userServiceClient.create(payload),
    );

    if (!user) handleCreateUserException();
    return { success: true, user: user };
  }

  public async validate({
    deviceId,
    sessionId,
    ip,
  }: ValidateRequestDto): Promise<ValidateResponseDto> {
    const session = await this.sessionRepository.findOneIdWithRelations(
      sessionId,
    );
    if (!session || deviceId !== session.device_id)
      return { permission: false };

    const ipChanged = session.device.ip_address !== ip;
    if (ipChanged) await this.deviceRepository.updateIp(deviceId, ip);

    return { permission: true };
  }

  public async findOneUserIdBySession(
    payload: FindOneUserIdBySessionRequestDto,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return { uuid: '' };
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
      sessionExpire: payload.sessionExpire,
    });

    return { deviceId: device.device_id, sessionId: session.session_id };
  }
}
