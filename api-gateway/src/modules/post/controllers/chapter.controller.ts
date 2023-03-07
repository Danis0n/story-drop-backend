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
import {
  CreateChapterRequestDto,
  CreateChapterResponseDto,
  DeleteChapterResponseDto,
  FindManyChapterByPostIdResponseDto,
  FindOneChapterByIdResponseDto,
  IsAuthenticatedGuard,
  UpdateChapterRequestDto,
  UpdateChapterResponseDto,
  UserId,
  UserIdValidateGuard,
} from '../../../common';
import { Observable } from 'rxjs';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

// TODO : implement methods
@Controller('api/chapter')
export class ChapterController implements OnModuleInit {
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
    @Body() payload: CreateChapterRequestDto,
  ): Promise<Observable<CreateChapterResponseDto>> {
    payload.userId = userId;
    return this.serviceClient.createChapter(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findId(
    @Param('id') chapterId: string,
  ): Promise<Observable<FindOneChapterByIdResponseDto>> {
    return this.serviceClient.findOneChapterById({ chapterId: chapterId });
  }

  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @Get('post/:id')
  private async findPostId(
    @Param('id') postId: string,
  ): Promise<Observable<FindManyChapterByPostIdResponseDto>> {
    return this.serviceClient.findManyChapterByPostId({ postId: postId });
  }

  // +guard
  @Patch('/:id')
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @UseInterceptors(GrpcToHttpInterceptor)
  private async update(
    @Body() payload: UpdateChapterRequestDto,
  ): Promise<Observable<UpdateChapterResponseDto>> {
    return this.serviceClient.updateChapter(payload);
  }

  // +guard
  @Delete('/:id')
  @UseGuards(IsAuthenticatedGuard, UserIdValidateGuard)
  @UseInterceptors(GrpcToHttpInterceptor)
  private async delete(
    @Param('id') chapterId: string,
  ): Promise<Observable<DeleteChapterResponseDto>> {
    return this.serviceClient.deleteChapter({ chapterId: chapterId });
  }
}
