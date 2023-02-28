import { Inject, Injectable } from '@nestjs/common';
import {
  CreateGenreRequestDto,
  CreateGenreResponseDto,
  DeleteGenreRequestDto,
  DeleteGenreResponseDto,
  FindOneGenreByIdRequestDto,
  FindOneGenreByIdResponseDto,
  GenreMapper,
  GenreRepository,
  UpdateGenreRequestDto,
  UpdateGenreResponseDto,
} from '../../common';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class GenreService {
  @Inject(GenreRepository)
  private readonly repository: GenreRepository;

  @Inject(GenreMapper)
  private readonly mapper: GenreMapper;

  public async create({
    name,
  }: CreateGenreRequestDto): Promise<CreateGenreResponseDto> {
    const genre = await this.repository.create(name);
    if (!genre)
      throw new GrpcAlreadyExistsException(
        'Жанр с таким именем уже существует!',
      );

    return { genre: this.mapper.mapToGenreDto(genre), success: true };
  }

  public async findId({
    genreId,
  }: FindOneGenreByIdRequestDto): Promise<FindOneGenreByIdResponseDto> {
    const genre = await this.repository.findId(genreId);
    if (!genre)
      throw new GrpcNotFoundException('Жанр с таким id не существует!');

    return { genre: this.mapper.mapToGenreDto(genre), success: true };
  }

  public async update({
    genreId,
    name,
  }: UpdateGenreRequestDto): Promise<UpdateGenreResponseDto> {
    const genre = await this.repository.update(name, genreId);
    if (!genre)
      throw new GrpcNotFoundException('Жанр с таким id не существует!');

    return { genre: this.mapper.mapToGenreDto(genre), success: true };
  }

  public async delete({
    genreId,
  }: DeleteGenreRequestDto): Promise<DeleteGenreResponseDto> {
    const genre = await this.repository.delete(genreId);
    if (!genre)
      throw new GrpcNotFoundException('Жанр с таким id не существует!');

    return { success: true };
  }
}
