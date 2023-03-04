import { Module } from '@nestjs/common';
import { FandomController } from './fandom.controller';
import { FandomService } from './fandom.service';
import { FandomMapper, FandomRepository } from '../../common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FandomController],
  providers: [FandomService, FandomRepository, FandomMapper],
})
export class FandomModule {}
