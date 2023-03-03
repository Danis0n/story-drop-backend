import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '../../proto/post.pb';
import {
  CreateGenreRequestDto,
  CreateGenreResponseDto,
  DeleteGenreRequestDto,
  DeleteGenreResponseDto,
  FindOneGenreByIdRequestDto,
  FindOneGenreByIdResponseDto,
  UpdateGenreRequestDto,
  UpdateGenreResponseDto,
} from '../../common';
import { GenreService } from './genre.service';

@Controller()
export class GenreController {
  @Inject(GenreService)
  private readonly s: GenreService;

  @GrpcMethod(POST_SERVICE_NAME, 'CreateGenre')
  private async create(
    payload: CreateGenreRequestDto,
  ): Promise<CreateGenreResponseDto> {
    return this.s.create(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'FindOneGenreById')
  private async findId(
    payload: FindOneGenreByIdRequestDto,
  ): Promise<FindOneGenreByIdResponseDto> {
    return this.s.findId(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'UpdateGenre')
  private async update(
    payload: UpdateGenreRequestDto,
  ): Promise<UpdateGenreResponseDto> {
    return this.s.update(payload);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeleteGenre')
  private async delete(
    payload: DeleteGenreRequestDto,
  ): Promise<DeleteGenreResponseDto> {
    return this.s.delete(payload);
  }
}
