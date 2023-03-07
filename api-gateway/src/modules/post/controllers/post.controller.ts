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
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostResponseDto,
  FindOnePostResponseDto,
  IsAuthenticatedGuard,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
  UserId,
  UserIdValidateGuard,
} from '../../../common';
import { Observable } from 'rxjs';

@Controller('api/post')
export class PostController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @Post()
  private async create(
    @UserId() userId: string,
    @Body() payload: CreatePostRequestDto,
  ): Promise<Observable<CreatePostResponseDto>> {
    payload.userId = userId;
    return this.serviceClient.createPost(payload);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOnePostResponseDto>> {
    return this.serviceClient.findOnePostById({ uuid: uuid });
  }

  // +PostGuard
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @Patch('/:id')
  private async update(
    @UserId() userId: string,
    @Param('id') postId: string,
    @Body() payload: UpdatePostRequestDto,
  ): Promise<Observable<UpdatePostResponseDto>> {
    payload.postId = postId;
    payload.userId = userId;

    return this.serviceClient.updatePost(payload);
  }

  // check if user owns the post
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @Delete('/:id')
  private async delete(
    @UserId() userId: string,
    @Param('id') postId: string,
  ): Promise<Observable<DeletePostResponseDto>> {
    return this.serviceClient.deletePost({ postId: postId, userId: userId });
  }
}
