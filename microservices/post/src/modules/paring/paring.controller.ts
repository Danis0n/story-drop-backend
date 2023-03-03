import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import { ParingService } from './paring.service';
import {
  CreateParingRequestDto,
  CreateParingResponseDto,
  DeleteParingRequestDto,
  DeleteParingResponseDto,
  FindOneParingByIdRequestDto,
  FindOneParingByIdResponseDto,
  UpdateParingRequestDto,
  UpdateParingResponseDto,
} from '../../common';

@Controller()
export class ParingController {
  @Inject(ParingService)
  private readonly s: ParingService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateParing')
  private async create(
    payload: CreateParingRequestDto,
  ): Promise<CreateParingResponseDto> {
    return this.s.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneParingById')
  private async findId(
    payload: FindOneParingByIdRequestDto,
  ): Promise<FindOneParingByIdResponseDto> {
    return this.s.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateParing')
  private async update(
    payload: UpdateParingRequestDto,
  ): Promise<UpdateParingResponseDto> {
    return this.s.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteParing')
  private async delete(
    payload: DeleteParingRequestDto,
  ): Promise<DeleteParingResponseDto> {
    return this.s.delete(payload);
  }
}
