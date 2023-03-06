import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostRequestDto,
  DeletePostResponseDto,
  FindOnePostByIdRequestDto,
  FindOnePostResponseDto,
  IsOwnerRequestDto,
  IsOwnerResponseDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from '../../common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  @Inject(PostService)
  private readonly ps: PostService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreatePost')
  private async create(
    payload: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return this.ps.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOnePostById')
  private async findId(
    payload: FindOnePostByIdRequestDto,
  ): Promise<FindOnePostResponseDto> {
    return this.ps.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdatePost')
  private async update(
    payload: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    return this.ps.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeletePost')
  private async delete(
    payload: DeletePostRequestDto,
  ): Promise<DeletePostResponseDto> {
    return this.ps.delete(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'IsOwner')
  private async isOwner(
    payload: IsOwnerRequestDto,
  ): Promise<IsOwnerResponseDto> {
    return this.ps.isOwner(payload);
  }
}
