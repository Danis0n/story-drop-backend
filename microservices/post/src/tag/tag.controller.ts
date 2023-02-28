import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../post/proto/post.pb';
import {
  CreateTagRequestDto,
  CreateTagResponseDto,
  DeleteTagRequestDto,
  DeleteTagResponseDto,
  FindOneTagByIdRequestDto,
  FindOneTagByIdResponseDto,
  UpdateTagRequestDto,
  UpdateTagResponseDto,
} from '../common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  @Inject(TagService)
  private readonly service: TagService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateTag')
  private async create(
    payload: CreateTagRequestDto,
  ): Promise<CreateTagResponseDto> {
    return this.service.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneTagById')
  private async findId(
    payload: FindOneTagByIdRequestDto,
  ): Promise<FindOneTagByIdResponseDto> {
    return this.service.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateTag')
  private async update(
    payload: UpdateTagRequestDto,
  ): Promise<UpdateTagResponseDto> {
    return this.service.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteTag')
  private async delete(
    payload: DeleteTagRequestDto,
  ): Promise<DeleteTagResponseDto> {
    return this.service.delete(payload);
  }
}
