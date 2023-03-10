import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostResponseDto,
  FindOnePostResponseDto,
  IsAuthenticatedGuard,
  PostGuard,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
  UserId,
  UserIdValidateGuard,
} from '../../../common';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/post')
export class PostController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @Post()
  private async create(
    @UserId() userId: string,
    @Body() payload: CreatePostRequestDto,
  ): Promise<Observable<CreatePostResponseDto>> {
    payload.userId = userId;
    return this.serviceClient.createPost(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findOneId(
    @Param('id') postId: string,
  ): Promise<Observable<FindOnePostResponseDto>> {
    return this.serviceClient.findOnePostById({ postId: postId });
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard, PostGuard)
  @Patch('/:id')
  private async update(
    @Param('id') postId: string,
    @Body() payload: UpdatePostRequestDto,
  ): Promise<Observable<UpdatePostResponseDto>> {
    payload.postId = postId;

    return this.serviceClient.updatePost(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard, PostGuard)
  @Delete('/:id')
  private async delete(
    @UserId() userId: string,
    @Param('id') postId: string,
  ): Promise<Observable<DeletePostResponseDto>> {
    return this.serviceClient.deletePost({ postId: postId });
  }
}
