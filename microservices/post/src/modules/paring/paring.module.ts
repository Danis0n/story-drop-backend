import { Module } from '@nestjs/common';
import { ParingController } from './paring.controller';
import { ParingService } from './paring.service';
import { ParingMapper, ParingRepository } from '../../common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParingController],
  providers: [ParingService, ParingMapper, ParingRepository],
  exports: [ParingMapper],
})
export class ParingModule {}
