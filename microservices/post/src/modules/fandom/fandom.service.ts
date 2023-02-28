import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFandomRequestDto,
  CreateFandomResponseDto,
  DeleteFandomRequestDto,
  DeleteFandomResponseDto,
  FandomMapper,
  FandomRepository,
  FindOneFandomByIdRequestDto,
  FindOneFandomByIdResponseDto,
  UpdateFandomRequestDto,
  UpdateFandomResponseDto,
} from '../../common';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class FandomService {
  @Inject(FandomMapper)
  private readonly mapper: FandomMapper;

  @Inject(FandomRepository)
  private readonly repository: FandomRepository;

  public async create({
    name,
  }: CreateFandomRequestDto): Promise<CreateFandomResponseDto> {
    const fandom = await this.repository.create(name);
    if (!fandom)
      throw new GrpcAlreadyExistsException(
        'Фандом с таким именем уже существует!',
      );

    return { fandom: this.mapper.mapToFandomDto(fandom), success: true };
  }

  public async findId({
    fandomId,
  }: FindOneFandomByIdRequestDto): Promise<FindOneFandomByIdResponseDto> {
    const fandom = await this.repository.findId(fandomId);
    if (!fandom)
      throw new GrpcNotFoundException('Фандом с таким id не существует!');

    return { fandom: this.mapper.mapToFandomDto(fandom), success: true };
  }

  public async update({
    fandomId,
    name,
  }: UpdateFandomRequestDto): Promise<UpdateFandomResponseDto> {
    const fandom = await this.repository.update(name, fandomId);
    if (!fandom)
      throw new GrpcNotFoundException('Фандом с таким id не существует!');

    return { fandom: this.mapper.mapToFandomDto(fandom), success: true };
  }

  public async delete({
    fandomId,
  }: DeleteFandomRequestDto): Promise<DeleteFandomResponseDto> {
    const fandom = await this.repository.delete(fandomId);
    if (!fandom)
      throw new GrpcNotFoundException('Фандом с таким id не существует!');

    return { success: true };
  }
}
