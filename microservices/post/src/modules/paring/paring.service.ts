import { Inject, Injectable } from '@nestjs/common';
import {
  CreateParingRequestDto,
  CreateParingResponseDto,
  DeleteParingRequestDto,
  DeleteParingResponseDto,
  FindOneParingByIdRequestDto,
  FindOneParingByIdResponseDto,
  ParingMapper,
  ParingRepository,
  UpdateParingRequestDto,
  UpdateParingResponseDto,
} from '../../common';
import {
  GrpcInternalException,
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class ParingService {
  @Inject(ParingRepository)
  private readonly repository: ParingRepository;

  @Inject(ParingMapper)
  private readonly mapper: ParingMapper;

  public async create({
    name,
    characterIds,
  }: CreateParingRequestDto): Promise<CreateParingResponseDto> {
    if (characterIds.length < 2)
      throw new GrpcInvalidArgumentException(
        'Ошибка при создании пейринга с одним или менее персонажем!',
      );

    const paring = await this.repository.create(
      name,
      this.mapper.mapToInsertCharacters(characterIds),
    );

    if (!paring)
      throw new GrpcInternalException('Ошибка при создании пейринга!');

    return { paring: this.mapper.mapToParingDto(paring), success: true };
  }

  public async findId({
    paringId,
  }: FindOneParingByIdRequestDto): Promise<FindOneParingByIdResponseDto> {
    const paring = await this.repository.findId(paringId);
    if (!paring)
      throw new GrpcNotFoundException('Пейринг с таким id не существует!');

    return { paring: this.mapper.mapToParingDto(paring), success: true };
  }

  public async update({
    name,
    paringId,
    insertCharacterIds,
    removeCharacterIds,
  }: UpdateParingRequestDto): Promise<UpdateParingResponseDto> {
    const paring = await this.repository.update(
      paringId,
      name,
      this.mapper.mapToInsertCharacters(insertCharacterIds),
      this.mapper.mapToInsertCharacters(removeCharacterIds),
    );
    if (!paring)
      throw new GrpcNotFoundException('Пейринг с таким id не существует!');

    return { paring: this.mapper.mapToParingDto(paring), success: true };
  }

  public async delete({
    paringId,
  }: DeleteParingRequestDto): Promise<DeleteParingResponseDto> {
    const paring = await this.repository.delete(paringId);
    if (!paring)
      throw new GrpcNotFoundException('Пейринг с таким id не существует!');

    return { success: true };
  }
}
