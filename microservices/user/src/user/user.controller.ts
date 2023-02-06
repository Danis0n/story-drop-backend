import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUser,
  FindAllResponse,
  FindAnyByRequest,
  FindAnyByResponse,
  FindOneIdRequest,
  FindOneResponse,
  USER_SERVICE_NAME,
} from './proto/user.pb';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, 'Create')
  private async create(payload: CreateUser): Promise<FindOneResponse> {
    return this.service.create(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindAll')
  private async findAll(): Promise<FindAllResponse> {
    return this.service.findAll();
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindAnyExistBy')
  private async findAnyExist(
    payload: FindAnyByRequest,
  ): Promise<FindAnyByResponse> {
    return this.service.findAnyExist(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindOneId')
  private async findOneId(payload: FindOneIdRequest): Promise<FindOneResponse> {
    return this.service.findOneId(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindOneSession')
  private async findOneSession(
    payload: FindOneIdRequest,
  ): Promise<FindOneResponse> {
    return this.service.findOneSession(payload);
  }
}
