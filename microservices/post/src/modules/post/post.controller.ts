import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FindOnePostResponse, POST_SERVICE_NAME } from '../../proto/post.pb';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostRequestDto,
  DeletePostResponseDto,
  FindOnePostByIdRequestDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from '../../common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  @Inject(PostService)
  private readonly s: PostService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreatePost')
  private async create(
    payload: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return this.s.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOnePostById')
  private async findId(
    payload: FindOnePostByIdRequestDto,
  ): Promise<FindOnePostResponse> {
    return this.s.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdatePost')
  private async update(
    payload: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    return this.s.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeletePost')
  private async delete(
    payload: DeletePostRequestDto,
  ): Promise<DeletePostResponseDto> {
    return this.s.delete(payload);
  }
}
