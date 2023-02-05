/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface ValidateResponse {
  permission: boolean;
}

export interface ValidateRequest {
  sessionId: string;
  deviceId: string;
  ip: string;
}

export interface LogoutResponse {
  isLoggedOut: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
  sessionId: string;
  sessionExpire: number;
  userAgent: string;
  ip: string;
}

export interface LoginResponse {
  user: User | undefined;
  deviceId: string;
  sessionId: string;
  isLogged: boolean;
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

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest): Observable<LoginResponse>;

  logout(request: ValidateRequest): Observable<LogoutResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logout(request: ValidateRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "logout", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
