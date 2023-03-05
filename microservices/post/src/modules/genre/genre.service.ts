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
  private readonly r: GenreRepository;

  public async create({
    name,
  }: CreateGenreRequestDto): Promise<CreateGenreResponseDto> {
    const genre = await this.r.create(name);
    if (!genre)
      throw new GrpcAlreadyExistsException(
        'Жанр с таким именем уже существует!',
      );

    return { genre: GenreMapper.toDto(genre), success: true };
  }

  public async findId({
    genreId,
  }: FindOneGenreByIdRequestDto): Promise<FindOneGenreByIdResponseDto> {
    const genre = await this.r.findId(genreId);
    if (!genre)
      throw new GrpcNotFoundException('Жанр с таким id не существует!');

    return { genre: GenreMapper.toDto(genre), success: true };
  }

  public async findNameMany() {}

  public async update({
    genreId,
    name,
  }: UpdateGenreRequestDto): Promise<UpdateGenreResponseDto> {
    const genre = await this.r.update(name, genreId);
    if (!genre)
      throw new GrpcNotFoundException('Жанр с таким id не существует!');

    return { genre: GenreMapper.toDto(genre), success: true };
  }

  public async delete({
    genreId,
  }: DeleteGenreRequestDto): Promise<DeleteGenreResponseDto> {
    const genre = await this.r.delete(genreId);
    if (!genre)
      throw new GrpcNotFoundException('Жанр с таким id не существует!');

    return { success: true };
  }
}
