import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreMapper, GenreRepository } from '../../common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GenreService, GenreMapper, GenreRepository],
  controllers: [GenreController],
})
export class GenreModule {}
