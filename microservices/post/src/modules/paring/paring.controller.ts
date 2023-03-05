import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import { ParingService } from './paring.service';
import {
  CreateParingRequestDto,
  CreateParingResponseDto,
  DeleteParingRequestDto,
  DeleteParingResponseDto,
  FindManyParingByCharacterRequestDto,
  FindManyParingByCharacterResponseDto,
  FindManyParingByNameRequestDto,
  FindManyParingByNameResponseDto,
  FindOneParingByIdRequestDto,
  FindOneParingByIdResponseDto,
  UpdateParingRequestDto,
  UpdateParingResponseDto,
} from '../../common';

@Controller()
export class ParingController {
  @Inject(ParingService)
  private readonly ps: ParingService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateParing')
  private async create(
    payload: CreateParingRequestDto,
  ): Promise<CreateParingResponseDto> {
    return this.ps.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneParingById')
  private async findId(
    payload: FindOneParingByIdRequestDto,
  ): Promise<FindOneParingByIdResponseDto> {
    return this.ps.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindManyParingByCharacter')
  private async findCharacterId(
    payload: FindManyParingByCharacterRequestDto,
  ): Promise<FindManyParingByCharacterResponseDto> {
    return this.ps.findCharacterId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindManyParingByName')
  private async findName(
    payload: FindManyParingByNameRequestDto,
  ): Promise<FindManyParingByNameResponseDto> {
    return this.ps.findName(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateParing')
  private async update(
    payload: UpdateParingRequestDto,
  ): Promise<UpdateParingResponseDto> {
    return this.ps.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteParing')
  private async delete(
    payload: DeleteParingRequestDto,
  ): Promise<DeleteParingResponseDto> {
    return this.ps.delete(payload);
  }
}
