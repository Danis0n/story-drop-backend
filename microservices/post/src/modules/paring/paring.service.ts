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
  private readonly r: ParingRepository;

  @Inject(ParingMapper)
  private readonly m: ParingMapper;

  public async create({
    name,
    characterIds,
  }: CreateParingRequestDto): Promise<CreateParingResponseDto> {
    if (characterIds.length < 2)
      throw new GrpcInvalidArgumentException(
        'Ошибка при создании пейринга с одним или менее персонажем!',
      );

    const paring = await this.r.create(
      name,
      this.m.mapToCharacterPrismas(characterIds),
    );

    if (!paring)
      throw new GrpcInternalException('Ошибка при создании пейринга!');

    return { paring: this.m.mapToParingDto(paring), success: true };
  }

  public async findId({
    paringId,
  }: FindOneParingByIdRequestDto): Promise<FindOneParingByIdResponseDto> {
    const paring = await this.r.findId(paringId);
    if (!paring)
      throw new GrpcNotFoundException('Пейринг с таким id не существует!');

    return { paring: this.m.mapToParingDto(paring), success: true };
  }

  public async update({
    name,
    paringId,
    insertCharacterIds,
    removeCharacterIds,
  }: UpdateParingRequestDto): Promise<UpdateParingResponseDto> {
    const paring = await this.r.update(
      paringId,
      name,
      this.m.mapToCharacterPrismas(insertCharacterIds),
      this.m.mapToCharacterPrismas(removeCharacterIds),
    );
    if (!paring)
      throw new GrpcNotFoundException('Пейринг с таким id не существует!');

    return { paring: this.m.mapToParingDto(paring), success: true };
  }

  public async delete({
    paringId,
  }: DeleteParingRequestDto): Promise<DeleteParingResponseDto> {
    const paring = await this.r.delete(paringId);
    if (!paring)
      throw new GrpcNotFoundException('Пейринг с таким id не существует!');

    return { success: true };
  }
}
