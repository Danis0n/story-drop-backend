import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreMapper, GenreRepository } from '../common';

@Module({
  providers: [GenreService, GenreMapper, GenreRepository],
  controllers: [GenreController],
})
export class GenreModule {}
