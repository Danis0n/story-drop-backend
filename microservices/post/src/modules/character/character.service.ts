import { Inject, Injectable } from '@nestjs/common';
import {
  CharacterMapper,
  CharacterRepository,
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterRequestDto,
  DeleteCharacterResponseDto,
  FindManyCharacterByFandomRequestDto,
  FindManyCharacterByFandomResponseDto,
  FindManyCharacterByNameRequestDto,
  FindManyCharacterByNameResponseDto,
  FindManyCharacterByParingRequestDto,
  FindManyCharacterByParingResponseDto,
  FindOneCharacterByIdRequestDto,
  FindOneCharacterByIdResponseDto,
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from '../../common';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

// TODO : add logger
// TODO : add exceptions to api-gateway
@Injectable()
export class CharacterService {
  @Inject(CharacterRepository)
  private readonly r: CharacterRepository;

  public async create({
    name,
    fandomId,
  }: CreateCharacterRequestDto): Promise<CreateCharacterResponseDto> {
    const isExist = !!(await this.r.findName(name));

    if (isExist)
      throw new GrpcAlreadyExistsException(
        'Персонаж с таким именем уже существует!',
      );

    const character = await this.r.create(name, fandomId);
    if (!character) return { character: null, success: false };

    return {
      character: CharacterMapper.toDto(character),
      success: true,
    };
  }

  public async findId({
    characterId,
  }: FindOneCharacterByIdRequestDto): Promise<FindOneCharacterByIdResponseDto> {
    const character = await this.r.findId(characterId);
    if (!character)
      throw new GrpcNotFoundException('Персонаж с таким id не найден!');

    return {
      character: CharacterMapper.toDto(character),
      success: true,
    };
  }

  public async findParingId({
    paringId,
  }: FindManyCharacterByParingRequestDto): Promise<FindManyCharacterByParingResponseDto> {
    const characters = await this.r.findParingId(paringId);

    return {
      characters:
        characters.map(({ character }) => {
          return CharacterMapper.toDto(character);
        }) || [],
    };
  }

  public async findNameMany({
    name,
  }: FindManyCharacterByNameRequestDto): Promise<FindManyCharacterByNameResponseDto> {
    const characters = await this.r.findNameMany(name);

    return {
      characters:
        characters.map((character) => {
          return CharacterMapper.toDto(character);
        }) || [],
    };
  }

  public async findFandomId({
    fandomId,
  }: FindManyCharacterByFandomRequestDto): Promise<FindManyCharacterByFandomResponseDto> {
    const characters = await this.r.findFandomId(fandomId);

    return {
      characters:
        characters.map((character) => {
          return CharacterMapper.toDto(character);
        }) || [],
    };
  }

  public async update({
    name,
    characterId,
  }: UpdateCharacterRequestDto): Promise<UpdateCharacterResponseDto> {
    const character = await this.r.update(characterId, name);
    if (!character)
      throw new GrpcNotFoundException('Персонаж с таким id не найден!');

    return {
      character: CharacterMapper.toDto(character),
      success: true,
    };
  }

  public async delete({
    characterId,
  }: DeleteCharacterRequestDto): Promise<DeleteCharacterResponseDto> {
    const character = await this.r.delete(characterId);
    if (!character)
      throw new GrpcNotFoundException('Персонаж с таким id не найден!');

    return { success: true };
  }
}
