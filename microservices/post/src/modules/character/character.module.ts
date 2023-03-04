import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterMapper, CharacterRepository } from '../../common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository, CharacterMapper],
})
export class CharacterModule {}
