import { Inject, Injectable } from '@nestjs/common';
import {
  CharacterMapper,
  CharacterRepository,
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterRequestDto,
  DeleteCharacterResponseDto,
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

  public async update({
    name,
    characterId,
    fandomId,
  }: UpdateCharacterRequestDto): Promise<UpdateCharacterResponseDto> {
    const character = await this.r.update(characterId, name, fandomId);
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
    if (!character) return { success: false };

    return { success: true };
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
}
