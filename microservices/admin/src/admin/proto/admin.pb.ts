/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "admin";

export interface DeleteUserRequest {
  uuid: string;
}

export interface DeleteUserResponse {
  success: boolean;
}

export interface DeletePostRequest {
  uuid: string;
}

export interface DeletePostResponse {
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

export const ADMIN_PACKAGE_NAME = "admin";

export interface AdminServiceClient {
  updateBanned(request: UpdateBannedRequest): Observable<UpdateBannedResponse>;

  updateEnabled(request: UpdateEnabledRequest): Observable<UpdateEnabledResponse>;

  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;

  deletePost(request: DeletePostRequest): Observable<DeletePostResponse>;
}

export interface AdminServiceController {
  updateBanned(
    request: UpdateBannedRequest,
  ): Promise<UpdateBannedResponse> | Observable<UpdateBannedResponse> | UpdateBannedResponse;

  updateEnabled(
    request: UpdateEnabledRequest,
  ): Promise<UpdateEnabledResponse> | Observable<UpdateEnabledResponse> | UpdateEnabledResponse;

  deleteUser(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;

  deletePost(
    request: DeletePostRequest,
  ): Promise<DeletePostResponse> | Observable<DeletePostResponse> | DeletePostResponse;
}

export function AdminServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["updateBanned", "updateEnabled", "deleteUser", "deletePost"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AdminService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AdminService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ADMIN_SERVICE_NAME = "AdminService";
