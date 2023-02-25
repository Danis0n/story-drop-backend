import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreMapper } from '../common';
import { GenreRepository } from '../common/repository/genre';

@Module({
  providers: [GenreService, GenreMapper, GenreRepository],
  controllers: [GenreController],
})
export class GenreModule {}
