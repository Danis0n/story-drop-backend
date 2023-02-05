/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'user';

export interface FindOneResponse {
  user: User | undefined;
}

export interface FindAvatarResponse {
  avatar: Image | undefined;
}

export interface FindAvatarByUserRequest {
  uuid: string;
}

export interface FindOneSessionRequest {
  sessionId: string;
}

export interface UpdateRequest {}

export interface UpdateResponse {}

export interface FindOneIdRequest {
  uuid: string;
}

export interface FindOneByRequest {
  username: string;
  email: string;
  nickname: string;
}

export interface FindAllRequest {}

export interface FindAllResponse {
  users: User[];
}

export interface CreateUser {
  username: string;
  password: string;
  email: string;
  nickname: string;
  text: string;
  contact: string;
}

export interface User {
  uuid: string;
  username: string;
  email: string;
  nickname: string;
  isEnabled: boolean;
  isLocked: boolean;
  isAvatar: boolean;
  info: UserInfo | undefined;
  roles: string[];
}

export interface Role {
  name: string;
}

export interface UserInfo {
  text: string;
  contact: string;
}

export interface Image {
  imageUuid: string;
  buffer: string;
  date: string;
  name: string;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  create(request: CreateUser): Observable<FindOneResponse>;

  findAll(request: FindAllRequest): Observable<FindAllResponse>;

  findOneBy(request: FindOneByRequest): Observable<FindOneResponse>;

  findOneId(request: FindOneIdRequest): Observable<FindOneResponse>;

  findOneSession(request: FindOneSessionRequest): Observable<FindOneResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  findAvatarByUser(
    request: FindAvatarByUserRequest,
  ): Observable<FindAvatarResponse>;
}

export interface UserServiceController {
  create(
    request: CreateUser,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findAll(
    request: FindAllRequest,
  ): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  findOneBy(
    request: FindOneByRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findOneId(
    request: FindOneIdRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findOneSession(
    request: FindOneSessionRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  update(
    request: UpdateRequest,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  findAvatarByUser(
    request: FindAvatarByUserRequest,
  ):
    | Promise<FindAvatarResponse>
    | Observable<FindAvatarResponse>
    | FindAvatarResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'findAll',
      'findOneBy',
      'findOneId',
      'findOneSession',
      'update',
      'findAvatarByUser',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
