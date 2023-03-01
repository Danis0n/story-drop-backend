import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../post/proto/post.pb';
import { ChapterService } from './chapter.service';
import {
  CreateChapterRequestDto,
  CreateChapterResponseDto,
  DeleteChapterRequestDto,
  DeleteChapterResponseDto,
  FindOneChapterByIdRequestDto,
  FindOneChapterByIdResponseDto,
  UpdateChapterRequestDto,
  UpdateChapterResponseDto,
} from '../../common';

@Controller('chapter')
export class ChapterController {
  @Inject(ChapterService)
  private readonly service: ChapterService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateChapter')
  private async create(
    payload: CreateChapterRequestDto,
  ): Promise<CreateChapterResponseDto> {
    return this.service.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneChapterById')
  private async findId(
    payload: FindOneChapterByIdRequestDto,
  ): Promise<FindOneChapterByIdResponseDto> {
    return this.service.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateChapter')
  private async update(
    payload: UpdateChapterRequestDto,
  ): Promise<UpdateChapterResponseDto> {
    return this.service.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteChapter')
  private async delete(
    payload: DeleteChapterRequestDto,
  ): Promise<DeleteChapterResponseDto> {
    return this.service.delete(payload);
  }
}
