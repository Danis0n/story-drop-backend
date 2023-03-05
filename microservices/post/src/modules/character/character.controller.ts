import { Controller, Inject } from '@nestjs/common';
import { CharacterService } from './character.service';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import {
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterRequestDto,
  DeleteCharacterResponseDto,
  FindManyCharacterByFandomRequestDto,
  FindManyCharacterByFandomResponseDto,
  FindManyCharacterByNameRequestDto,
  FindManyCharacterByNameResponseDto,
  FindManyCharacterByParingRequestDto,
  FindManyCharacterByParingResponseDto,
  FindOneCharacterByIdRequestDto,
  FindOneCharacterByIdResponseDto,
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from '../../common';

@Controller('character')
export class CharacterController {
  @Inject(CharacterService)
  private readonly cs: CharacterService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateCharacter')
  private async create(
    payload: CreateCharacterRequestDto,
  ): Promise<CreateCharacterResponseDto> {
    return this.cs.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneCharacterById')
  private async findId(
    payload: FindOneCharacterByIdRequestDto,
  ): Promise<FindOneCharacterByIdResponseDto> {
    return this.cs.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneCharacterByParing')
  private async findParingId(
    payload: FindManyCharacterByParingRequestDto,
  ): Promise<FindManyCharacterByParingResponseDto> {
    return this.cs.findParingId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindManyCharacterByFandom')
  private async findFandomId(
    payload: FindManyCharacterByFandomRequestDto,
  ): Promise<FindManyCharacterByFandomResponseDto> {
    return this.cs.findFandomId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindManyCharacterByName')
  private async findName(
    payload: FindManyCharacterByNameRequestDto,
  ): Promise<FindManyCharacterByNameResponseDto> {
    return this.cs.findName(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateCharacter')
  private async update(
    payload: UpdateCharacterRequestDto,
  ): Promise<UpdateCharacterResponseDto> {
    return this.cs.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteCharacter')
  private async delete(
    payload: DeleteCharacterRequestDto,
  ): Promise<DeleteCharacterResponseDto> {
    return this.cs.delete(payload);
  }
}
