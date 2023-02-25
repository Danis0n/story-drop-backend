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
} from '../common';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

// TODO : add logger
// TODO : add exceptions to api-gateway
// TODO : add findByParing
@Injectable()
export class CharacterService {
  @Inject(CharacterRepository)
  private readonly repository: CharacterRepository;

  @Inject(CharacterMapper)
  private readonly mapper: CharacterMapper;

  public async create({
    name,
    fandomId,
  }: CreateCharacterRequestDto): Promise<CreateCharacterResponseDto> {
    const isExist = !!(await this.repository.findName(name));

    if (isExist)
      throw new GrpcAlreadyExistsException(
        'Персонаж с таким именем уже сущесвтует!',
      );

    const character = await this.repository.create(name, fandomId);
    if (!character) return { character: null, success: false };

    return {
      character: this.mapper.mapToCharacterDto(character),
      success: true,
    };
  }

  public async update({
    name,
    characterId,
    fandomId,
  }: UpdateCharacterRequestDto): Promise<UpdateCharacterResponseDto> {
    const character = await this.repository.update(characterId, name, fandomId);
    if (!character)
      throw new GrpcNotFoundException('Персонаж с таким id не найден!');

    return {
      character: this.mapper.mapToCharacterDto(character),
      success: true,
    };
  }

  public async delete({
    characterId,
  }: DeleteCharacterRequestDto): Promise<DeleteCharacterResponseDto> {
    const character = await this.repository.delete(characterId);
    if (!character) return { success: false };

    return { success: true };
  }

  public async findId({
    characterId,
  }: FindOneCharacterByIdRequestDto): Promise<FindOneCharacterByIdResponseDto> {
    const character = await this.repository.findId(characterId);
    if (!character)
      throw new GrpcNotFoundException('Персонаж с таким id не найден!');

    return {
      character: this.mapper.mapToCharacterDto(character),
      success: true,
    };
  }
}
