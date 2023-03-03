import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FandomService } from './fandom.service';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import {
  CreateFandomRequestDto,
  CreateFandomResponseDto,
  DeleteFandomRequestDto,
  DeleteFandomResponseDto,
  FindOneFandomByIdRequestDto,
  FindOneFandomByIdResponseDto,
  UpdateFandomRequestDto,
  UpdateFandomResponseDto,
} from '../../common';

@Controller()
export class FandomController {
  @Inject(FandomService)
  private readonly s: FandomService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateFandom')
  private async create(
    payload: CreateFandomRequestDto,
  ): Promise<CreateFandomResponseDto> {
    return this.s.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneFandomById')
  private async findId(
    payload: FindOneFandomByIdRequestDto,
  ): Promise<FindOneFandomByIdResponseDto> {
    return this.s.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateFandom')
  private async update(
    payload: UpdateFandomRequestDto,
  ): Promise<UpdateFandomResponseDto> {
    return this.s.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteFandom')
  private async delete(
    payload: DeleteFandomRequestDto,
  ): Promise<DeleteFandomResponseDto> {
    return this.s.delete(payload);
  }
}
