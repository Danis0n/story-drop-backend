import { Module } from '@nestjs/common';
import { ParingController } from './paring.controller';
import { ParingService } from './paring.service';

@Module({
  controllers: [ParingController],
  providers: [ParingService]
})
export class ParingModule {}
