import { Inject, Injectable } from '@nestjs/common';
import {
  ChapterMapper,
  ChapterRepository,
  CreateChapterRequestDto,
  CreateChapterResponseDto,
  DeleteChapterRequestDto,
  DeleteChapterResponseDto,
  FindOneChapterByIdRequestDto,
  FindOneChapterByIdResponseDto,
  UpdateChapterRequestDto,
  UpdateChapterResponseDto,
} from '../../common';
import {
  GrpcInternalException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class ChapterService {
  @Inject(ChapterMapper)
  private readonly m: ChapterMapper;

  @Inject(ChapterRepository)
  private readonly r: ChapterRepository;

  public async create(
    payload: CreateChapterRequestDto,
  ): Promise<CreateChapterResponseDto> {
    const quantity = await this.r.findQuantity(payload.postId);
    const number = quantity === null ? 1 : quantity.length + 1;

    const chapter = await this.r.create(payload, number);
    if (!chapter)
      throw new GrpcInternalException('Ошибка во время создания главы!');

    return { chapter: this.m.mapToChapterDto(chapter), success: false };
  }

  public async findId({
    chapterId,
  }: FindOneChapterByIdRequestDto): Promise<FindOneChapterByIdResponseDto> {
    const chapter = await this.r.findId(chapterId);
    if (!chapter)
      throw new GrpcNotFoundException('Главы с таким id не существует!');

    return { chapter: this.m.mapToChapterDto(chapter), success: true };
  }

  public async update(
    payload: UpdateChapterRequestDto,
  ): Promise<UpdateChapterResponseDto> {
    const chapter = await this.r.update(payload);
    if (!chapter)
      throw new GrpcNotFoundException('Главы с таким id не существует!');

    return { chapter: this.m.mapToChapterDto(chapter), success: true };
  }

  public async delete({
    chapterId,
  }: DeleteChapterRequestDto): Promise<DeleteChapterResponseDto> {
    const chapter = await this.r.delete(chapterId);
    if (!chapter)
      throw new GrpcNotFoundException('Главы с таким id не существует!');

    return { success: true };
  }
}
