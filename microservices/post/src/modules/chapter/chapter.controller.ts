import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import { ChapterService } from './chapter.service';
import {
  CreateChapterRequestDto,
  CreateChapterResponseDto,
  DeleteChapterRequestDto,
  DeleteChapterResponseDto,
  FindManyChapterByPostIdRequestDto,
  FindManyChapterByPostIdResponseDto,
  FindOneChapterByIdRequestDto,
  FindOneChapterByIdResponseDto,
  IsOwnerChapterRequestDto,
  IsOwnerChapterResponseDto,
  UpdateChapterRequestDto,
  UpdateChapterResponseDto,
} from '../../common';

@Controller('chapter')
export class ChapterController {
  @Inject(ChapterService)
  private readonly cs: ChapterService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateChapter')
  private async create(
    payload: CreateChapterRequestDto,
  ): Promise<CreateChapterResponseDto> {
    return this.cs.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneChapterById')
  private async findId(
    payload: FindOneChapterByIdRequestDto,
  ): Promise<FindOneChapterByIdResponseDto> {
    return this.cs.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindManyChapterByPostId')
  private async findPostId(
    payload: FindManyChapterByPostIdRequestDto,
  ): Promise<FindManyChapterByPostIdResponseDto> {
    return this.cs.findPostId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateChapter')
  private async update(
    payload: UpdateChapterRequestDto,
  ): Promise<UpdateChapterResponseDto> {
    return this.cs.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteChapter')
  private async delete(
    payload: DeleteChapterRequestDto,
  ): Promise<DeleteChapterResponseDto> {
    return this.cs.delete(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'IsOwnerChapter')
  private async isOwner(
    payload: IsOwnerChapterRequestDto,
  ): Promise<IsOwnerChapterResponseDto> {
    return this.cs.isOwner(payload);
  }
}
