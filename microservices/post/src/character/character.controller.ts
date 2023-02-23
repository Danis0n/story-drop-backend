import { Controller, Inject } from '@nestjs/common';
import { CharacterService } from './character.service';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../post/proto/post.pb';
import {
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
} from '../common';

@Controller('character')
export class CharacterController {
  @Inject(CharacterService)
  private readonly service: CharacterService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateCharacter')
  private async create(
    payload: CreateCharacterRequestDto,
  ): Promise<CreateCharacterResponseDto> {
    return this.service.create(payload);
  }
}
