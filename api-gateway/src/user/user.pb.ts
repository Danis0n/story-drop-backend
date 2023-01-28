/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface FindOneIdRequest {
  uuid: string;
}

export interface FindOneByRequest {
  username: string;
  email: string;
  nickname: string;
}

export interface FindAllRequest {
}

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
  password: string;
  email: string;
  nickname: string;
  isEnabled: boolean;
  isLocked: boolean;
  avatar: Image | undefined;
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

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: CreateUser): Observable<User>;

  findAll(request: FindAllRequest): Observable<FindAllResponse>;

  findOneBy(request: FindOneByRequest): Observable<User>;

  findOneId(request: FindOneIdRequest): Observable<User>;
}

export interface UserServiceController {
  create(request: CreateUser): Promise<User> | Observable<User> | User;

  findAll(request: FindAllRequest): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  findOneBy(request: FindOneByRequest): Promise<User> | Observable<User> | User;

  findOneId(request: FindOneIdRequest): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findAll", "findOneBy", "findOneId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
