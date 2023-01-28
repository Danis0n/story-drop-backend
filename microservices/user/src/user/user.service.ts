import { Injectable } from '@nestjs/common';
import {
  CreateUser,
  FindAllRequest,
  FindAllResponse,
  FindOneByRequest,
  FindOneIdRequest,
  User,
} from './proto/user.pb';

@Injectable()
export class UserService {
  public async create(payload: CreateUser): Promise<User> {
    return null;
  }

  public async findAll(payload: FindAllRequest): Promise<FindAllResponse> {
    return null;
  }

  public async findOne(payload: FindOneByRequest): Promise<User> {
    return null;
  }

  public async findOneId(payload: FindOneIdRequest): Promise<User> {
    return null;
  }
}
