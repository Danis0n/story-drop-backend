import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterMapper, CharacterRepository } from '../common';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository, CharacterMapper],
  exports: [CharacterMapper],
})
export class CharacterModule {}
