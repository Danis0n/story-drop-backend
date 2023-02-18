/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "post";

export interface FindOneIdRequest {
  uuid: string;
}

export interface FindOneResponse {
  success: boolean;
}

export interface CreatePostRequest {
}

export interface CreatePostResponse {
}

export interface UpdatePostRequest {
}

export interface UpdatePostResponse {
}

export interface DeletePostRequest {
}

export interface DeletePostResponse {
}

export const POST_PACKAGE_NAME = "post";

export interface PostServiceClient {
  findOneId(request: FindOneIdRequest): Observable<FindOneResponse>;
}

export interface PostServiceController {
  findOneId(request: FindOneIdRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;
}

export function PostServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOneId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PostService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PostService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const POST_SERVICE_NAME = "PostService";
