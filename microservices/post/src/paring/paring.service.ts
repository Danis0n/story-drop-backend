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
} from '../common';

// TODO: add findByCharacter
// TODO: add insertCharacter
// TODO: add removeCharacter
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
    const paring = await this.repository.create(
      name,
      this.mapper.mapToPrismaCharacterIds(characterIds),
    );

    return { paring: this.mapper.mapToParingDto(paring), success: false };
  }

  public async findId({
    paringId,
  }: FindOneParingByIdRequestDto): Promise<FindOneParingByIdResponseDto> {
    return undefined;
  }

  public async update({
    name,
    paringId,
    insertCharacterIds,
    removeCharacterIds,
  }: UpdateParingRequestDto): Promise<UpdateParingResponseDto> {
    return undefined;
  }

  public async delete({
    paringId,
  }: DeleteParingRequestDto): Promise<DeleteParingResponseDto> {
    return undefined;
  }
}
