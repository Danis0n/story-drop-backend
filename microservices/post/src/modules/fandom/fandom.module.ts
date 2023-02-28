import { Module } from '@nestjs/common';
import { FandomController } from './fandom.controller';
import { FandomService } from './fandom.service';
import { FandomMapper, FandomRepository } from '../../common';

@Module({
  controllers: [FandomController],
  providers: [FandomService, FandomRepository, FandomMapper],
  exports: [FandomService],
})
export class FandomModule {}
