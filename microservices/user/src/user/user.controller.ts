import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUser,
  FindAllRequest,
  FindAllResponse,
  FindOneByRequest,
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

  @GrpcMethod(USER_SERVICE_NAME, 'FindOneBy')
  private async findOne(payload: FindOneByRequest): Promise<FindOneResponse> {
    return this.service.findOne(payload);
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
