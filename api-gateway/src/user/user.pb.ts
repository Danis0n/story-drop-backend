/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface FindPasswordIdRequest {
  uuid: string;
}

export interface FindPasswordIdResponse {
  hashedPassword: string;
  success: boolean;
}

export interface UpdatePasswordRequest {
  uuid: string;
  hashedPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
}

export interface UpdateEnabledRequest {
  uuid: string;
  state: boolean;
}

export interface UpdateEnabledResponse {
  success: boolean;
}

export interface UpdateBannedRequest {
  uuid: string;
  state: boolean;
}

export interface UpdateBannedResponse {
  success: boolean;
}

export interface FindOneUsernameResponse {
  user: User | undefined;
  hashedPassword: string;
  isFound: boolean;
}

export interface FindOneUsernameRequest {
  username: string;
}

export interface FindOneRolesResponse {
  roles: string[];
}

export interface DeleteRequest {
  uuid: string;
}

export interface DeleteResponse {
  success: boolean;
}

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

export interface CreateImage {
  buffer: Uint8Array;
  fieldName: string;
  originalName: string;
  mimetype: string;
  size: number;
}

export interface UpdateAvatarRequest {
  uuid: string;
  delete: boolean;
  image: CreateImage | undefined;
}

export interface UpdateAvatarResponse {
  success: boolean;
}

export interface UpdateRequest {
  uuid: string;
  nickname: string;
  contact: string;
  text: string;
}

export interface UpdateResponse {
  user: User | undefined;
  success: boolean;
}

export interface FindOneIdRequest {
  uuid: string;
}

export interface FindAnyByRequest {
  username: string;
  email: string;
}

export interface FindAnyByResponse {
  foundByUsername: boolean;
  foundByEmail: boolean;
}

export interface FindAllRequest {
}

export interface FindAllResponse {
  users: User[];
}

export interface CreateUserRequest {
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

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: CreateUserRequest): Observable<FindOneResponse>;

  findAll(request: FindAllRequest): Observable<FindAllResponse>;

  findAnyExistBy(request: FindAnyByRequest): Observable<FindAnyByResponse>;

  findOneId(request: FindOneIdRequest): Observable<FindOneResponse>;

  findOneSession(request: FindOneSessionRequest): Observable<FindOneResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  findPasswordId(request: FindPasswordIdRequest): Observable<FindPasswordIdResponse>;

  updatePassword(request: UpdatePasswordRequest): Observable<UpdatePasswordResponse>;

  updateAvatar(request: UpdateAvatarRequest): Observable<UpdateAvatarResponse>;

  findAvatarByUser(request: FindAvatarByUserRequest): Observable<FindAvatarResponse>;

  delete(request: DeleteRequest): Observable<DeleteResponse>;

  findOneRoles(request: FindOneIdRequest): Observable<FindOneRolesResponse>;

  findOneUsername(request: FindOneUsernameRequest): Observable<FindOneUsernameResponse>;

  updateBanned(request: UpdateBannedRequest): Observable<UpdateBannedResponse>;

  updateEnabled(request: UpdateEnabledRequest): Observable<UpdateEnabledResponse>;
}

export interface UserServiceController {
  create(request: CreateUserRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findAll(request: FindAllRequest): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  findAnyExistBy(
    request: FindAnyByRequest,
  ): Promise<FindAnyByResponse> | Observable<FindAnyByResponse> | FindAnyByResponse;

  findOneId(request: FindOneIdRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findOneSession(
    request: FindOneSessionRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  update(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  findPasswordId(
    request: FindPasswordIdRequest,
  ): Promise<FindPasswordIdResponse> | Observable<FindPasswordIdResponse> | FindPasswordIdResponse;

  updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;

  updateAvatar(
    request: UpdateAvatarRequest,
  ): Promise<UpdateAvatarResponse> | Observable<UpdateAvatarResponse> | UpdateAvatarResponse;

  findAvatarByUser(
    request: FindAvatarByUserRequest,
  ): Promise<FindAvatarResponse> | Observable<FindAvatarResponse> | FindAvatarResponse;

  delete(request: DeleteRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  findOneRoles(
    request: FindOneIdRequest,
  ): Promise<FindOneRolesResponse> | Observable<FindOneRolesResponse> | FindOneRolesResponse;

  findOneUsername(
    request: FindOneUsernameRequest,
  ): Promise<FindOneUsernameResponse> | Observable<FindOneUsernameResponse> | FindOneUsernameResponse;

  updateBanned(
    request: UpdateBannedRequest,
  ): Promise<UpdateBannedResponse> | Observable<UpdateBannedResponse> | UpdateBannedResponse;

  updateEnabled(
    request: UpdateEnabledRequest,
  ): Promise<UpdateEnabledResponse> | Observable<UpdateEnabledResponse> | UpdateEnabledResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findAll",
      "findAnyExistBy",
      "findOneId",
      "findOneSession",
      "update",
      "findPasswordId",
      "updatePassword",
      "updateAvatar",
      "findAvatarByUser",
      "delete",
      "findOneRoles",
      "findOneUsername",
      "updateBanned",
      "updateEnabled",
    ];
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
