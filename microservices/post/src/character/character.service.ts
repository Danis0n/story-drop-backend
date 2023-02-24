import { Injectable } from '@nestjs/common';
import {
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterRequestDto,
  DeleteCharacterResponseDto,
  FindOneCharacterByIdRequestDto,
  FindOneCharacterByIdResponseDto,
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from '../common';

//TODO: make relation fandom-characters

@Injectable()
export class CharacterService {
  // name, fandomId
  public async create({
    name,
  }: CreateCharacterRequestDto): Promise<CreateCharacterResponseDto> {
    return { character: null, success: false };
  }

  public async update({
    name,
    characterId,
  }: UpdateCharacterRequestDto): Promise<UpdateCharacterResponseDto> {
    return { character: null, success: false };
  }

  public async delete({
    characterId,
  }: DeleteCharacterRequestDto): Promise<DeleteCharacterResponseDto> {
    return { success: false };
  }

  public async find({
    characterId,
  }: FindOneCharacterByIdRequestDto): Promise<FindOneCharacterByIdResponseDto> {
    return { character: null, success: false };
  }
}
