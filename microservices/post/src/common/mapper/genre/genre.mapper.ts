import { Injectable } from '@nestjs/common';
import { GenrePrisma } from '../../dto/genre/genre-prisma.interface';

@Injectable()
export class GenreMapper {
  public mapToGenreDto(genre: GenrePrisma) {
    return null;
  }
}
