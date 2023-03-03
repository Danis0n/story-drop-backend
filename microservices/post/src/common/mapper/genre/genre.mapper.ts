import { Injectable } from '@nestjs/common';
import { GenreDto, GenrePrisma } from '../../dto';

@Injectable()
export class GenreMapper {
  public mapToDto(genre: GenrePrisma): GenreDto {
    return null;
  }

  public mapToGenrePrismas(genreIds: string[]): { genre_id: string }[] {
    return genreIds.map((id) => {
      return { genre_id: id };
    });
  }
}
