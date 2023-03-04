import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { CollectionMapper, CollectionRepository } from '../../common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CollectionController],
  providers: [CollectionService, CollectionMapper, CollectionRepository],
})
export class CollectionModule {}
