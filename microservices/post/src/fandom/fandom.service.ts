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
} from '../common';

@Injectable()
export class FandomService {
  @Inject(FandomMapper)
  private readonly mapper: FandomMapper;

  @Inject(FandomRepository)
  private readonly repository: FandomRepository;

  public async create({
    name,
  }: CreateFandomRequestDto): Promise<CreateFandomResponseDto> {
    return { fandom: null, success: false };
  }

  public async findId({
    fandomId,
  }: FindOneFandomByIdRequestDto): Promise<FindOneFandomByIdResponseDto> {
    return { fandom: null, success: false };
  }

  public async update({
    fandomId,
    name,
  }: UpdateFandomRequestDto): Promise<UpdateFandomResponseDto> {
    return { fandom: null, success: false };
  }

  public async delete({
    fandomId,
  }: DeleteFandomRequestDto): Promise<DeleteFandomResponseDto> {
    return { success: false };
  }
}
