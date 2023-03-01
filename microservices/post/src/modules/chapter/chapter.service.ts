import { Injectable } from '@nestjs/common';
import {
  CreateChapterRequestDto,
  CreateChapterResponseDto,
  DeleteChapterRequestDto,
  DeleteChapterResponseDto,
  FindOneChapterByIdRequestDto,
  FindOneChapterByIdResponseDto,
  UpdateChapterRequestDto,
  UpdateChapterResponseDto,
} from '../../common';

@Injectable()
export class ChapterService {
  public async create(
    payload: CreateChapterRequestDto,
  ): Promise<CreateChapterResponseDto> {
    return undefined;
  }

  public async findId({
    chapterId,
  }: FindOneChapterByIdRequestDto): Promise<FindOneChapterByIdResponseDto> {
    return undefined;
  }

  public async update(
    payload: UpdateChapterRequestDto,
  ): Promise<UpdateChapterResponseDto> {
    return undefined;
  }

  public async delete({
    chapterId,
  }: DeleteChapterRequestDto): Promise<DeleteChapterResponseDto> {
    return undefined;
  }
}
