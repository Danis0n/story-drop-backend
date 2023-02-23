import { Injectable } from '@nestjs/common';
import { CreateCharacterRequestDto } from '../common';

@Injectable()
export class CharacterService {
  public async create(payload: CreateCharacterRequestDto) {
    return undefined;
  }
}
