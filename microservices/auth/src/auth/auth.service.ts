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
} from '../common';
import { USER_SERVICE_NAME, UserServiceClient } from './proto/user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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

    // const device = await this.deviceRepository.create();
    // create device in db and return deviceId
    // create session in db and return sessionId

    return {
      deviceId: payload.deviceName,
      isLogged: true,
      sessionId: payload.sessionId,
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

  public async findOneUserIdBySession(
    payload: FindOneUserIdBySessionRequestDto,
  ): Promise<FindOneUserIdBySessionResponseDto> {
    return { uuid: '' };
  }
}
