import { Controller, Inject } from '@nestjs/common';
import { CharacterService } from './character.service';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import {
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterRequestDto,
  DeleteCharacterResponseDto,
  FindOneCharacterByIdRequestDto,
  FindOneCharacterByIdResponseDto,
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from '../../common';

@Controller('character')
export class CharacterController {
  @Inject(CharacterService)
  private readonly s: CharacterService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateCharacter')
  private async create(
    payload: CreateCharacterRequestDto,
  ): Promise<CreateCharacterResponseDto> {
    return this.s.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneCharacterById')
  private async findId(
    payload: FindOneCharacterByIdRequestDto,
  ): Promise<FindOneCharacterByIdResponseDto> {
    return this.s.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateCharacter')
  private async update(
    payload: UpdateCharacterRequestDto,
  ): Promise<UpdateCharacterResponseDto> {
    return this.s.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteCharacter')
  private async delete(
    payload: DeleteCharacterRequestDto,
  ): Promise<DeleteCharacterResponseDto> {
    return this.s.delete(payload);
  }
}
