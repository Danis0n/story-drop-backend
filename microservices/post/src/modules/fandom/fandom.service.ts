import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFandomRequestDto,
  CreateFandomResponseDto,
  DeleteFandomRequestDto,
  DeleteFandomResponseDto,
  FandomMapper,
  FandomRepository,
  FindManyFandomByNameRequestDto,
  FindManyFandomByNameResponseDto,
  FindOneFandomByCharacterRequestDto,
  FindOneFandomByCharacterResponseDto,
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
  @Inject(FandomRepository)
  private readonly r: FandomRepository;

  public async create({
    name,
  }: CreateFandomRequestDto): Promise<CreateFandomResponseDto> {
    const fandom = await this.r.create(name);
    if (!fandom)
      throw new GrpcAlreadyExistsException(
        'Фандом с таким именем уже существует!',
      );

    return { fandom: FandomMapper.toDto(fandom), success: true };
  }

  public async findId({
    fandomId,
  }: FindOneFandomByIdRequestDto): Promise<FindOneFandomByIdResponseDto> {
    const fandom = await this.r.findId(fandomId);
    if (!fandom)
      throw new GrpcNotFoundException('Фандом с таким id не существует!');

    return { fandom: FandomMapper.toDto(fandom), success: true };
  }

  public async findNameMany({
    name,
  }: FindManyFandomByNameRequestDto): Promise<FindManyFandomByNameResponseDto> {
    const fandoms = await this.r.findNameMany(name);

    return {
      fandoms: fandoms
        ? fandoms.map((fandom) => {
            return FandomMapper.toDto(fandom);
          })
        : [],
    };
  }

  public async findCharacterId({
    characterId,
  }: FindOneFandomByCharacterRequestDto): Promise<FindOneFandomByCharacterResponseDto> {
    const { fandom } = await this.r.findCharacterId(characterId);
    if (!fandom)
      throw new GrpcNotFoundException(
        'Фандом с таким characterId не существует!',
      );

    return { fandom: FandomMapper.toDto(fandom), success: false };
  }

  public async update({
    fandomId,
    name,
  }: UpdateFandomRequestDto): Promise<UpdateFandomResponseDto> {
    const fandom = await this.r.update(name, fandomId);
    if (!fandom)
      throw new GrpcNotFoundException('Фандом с таким id не существует!');

    return { fandom: FandomMapper.toDto(fandom), success: true };
  }

  public async delete({
    fandomId,
  }: DeleteFandomRequestDto): Promise<DeleteFandomResponseDto> {
    const fandom = await this.r.delete(fandomId);
    if (!fandom)
      throw new GrpcNotFoundException('Фандом с таким id не существует!');

    return { success: true };
  }
}
