import { Controller, Inject } from '@nestjs/common';
import { FandomService } from './fandom.service';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../post/proto/post.pb';
import {
  CreateFandomRequestDto,
  CreateFandomResponseDto,
  DeleteFandomRequestDto,
  DeleteFandomResponseDto,
  FindOneFandomByIdRequestDto,
  FindOneFandomByIdResponseDto,
  UpdateFandomRequestDto,
  UpdateFandomResponseDto,
} from '../common';

@Controller()
export class FandomController {
  @Inject(FandomService)
  private readonly service: FandomService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateFandom')
  private async create(
    payload: CreateFandomRequestDto,
  ): Promise<CreateFandomResponseDto> {
    return this.service.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneFandomById')
  private async findId(
    payload: FindOneFandomByIdRequestDto,
  ): Promise<FindOneFandomByIdResponseDto> {
    return this.service.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateFandom')
  private async update(
    payload: UpdateFandomRequestDto,
  ): Promise<UpdateFandomResponseDto> {
    return this.service.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteFandom')
  private async delete(
    payload: DeleteFandomRequestDto,
  ): Promise<DeleteFandomResponseDto> {
    return this.service.delete(payload);
  }
}
