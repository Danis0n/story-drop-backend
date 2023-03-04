import { Injectable } from '@nestjs/common';
import { GenreDto, GenrePrisma } from '../../dto';

@Injectable()
export class GenreMapper {
  public static toDto({ genre_id, genre_name }: GenrePrisma): GenreDto {
    return { genreId: genre_id, name: genre_name };
  }

  public static toPrisma(genreIds: string[]): { genre_id: string }[] {
    return genreIds.map((id) => {
      return { genre_id: id };
    });
  }
}
