import { Module } from '@nestjs/common';
import { FandomController } from './fandom.controller';
import { FandomService } from './fandom.service';

@Module({
  controllers: [FandomController],
  providers: [FandomService]
})
export class FandomModule {}
