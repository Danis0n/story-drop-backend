import { Injectable } from '@nestjs/common';
import {
  CreateGenreRequestDto,
  CreateGenreResponseDto,
  DeleteGenreRequestDto,
  DeleteGenreResponseDto,
  FindOneGenreByIdRequestDto,
  FindOneGenreByIdResponseDto,
  UpdateGenreRequestDto,
  UpdateGenreResponseDto,
} from '../common';

@Injectable()
export class GenreService {
  public async create({
    name,
  }: CreateGenreRequestDto): Promise<CreateGenreResponseDto> {
    return { genre: null, success: false };
  }

  public async findId({
    genreId,
  }: FindOneGenreByIdRequestDto): Promise<FindOneGenreByIdResponseDto> {
    return { genre: null, success: false };
  }

  public async update({
    genreId,
    name,
  }: UpdateGenreRequestDto): Promise<UpdateGenreResponseDto> {
    return { genre: null, success: false };
  }

  public async delete({
    genreId,
  }: DeleteGenreRequestDto): Promise<DeleteGenreResponseDto> {
    return { success: false };
  }
}
