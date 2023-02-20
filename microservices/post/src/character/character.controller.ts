import { Controller, Inject } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  @Inject(CharacterService)
  private readonly service: CharacterService;

  private async create(payload) {}
}
