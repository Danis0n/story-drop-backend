/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface UpdatePasswordRequest {
  uuid: string;
  newPassword: string;
  oldPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
}

export interface LogoutRequest {
  sessionId: string;
  deviceId: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
  text: string;
  contact: string;
}

export interface RegisterResponse {
  user: User | undefined;
  success: boolean;
}

export interface FindOneUserIdBySessionRequest {
  session: string;
}

export interface FindOneUserIdBySessionResponse {
  uuid: string;
}

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
  deviceName: string;
  deviceType: string;
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

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  register(request: RegisterRequest): Observable<RegisterResponse>;

  updatePassword(request: UpdatePasswordRequest): Observable<UpdatePasswordResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  findOneUserIdBySession(request: FindOneUserIdBySessionRequest): Observable<FindOneUserIdBySessionResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logout(request: LogoutRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  findOneUserIdBySession(
    request: FindOneUserIdBySessionRequest,
  ):
    | Promise<FindOneUserIdBySessionResponse>
    | Observable<FindOneUserIdBySessionResponse>
    | FindOneUserIdBySessionResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "login",
      "logout",
      "register",
      "updatePassword",
      "validate",
      "findOneUserIdBySession",
    ];
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
