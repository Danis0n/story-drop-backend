import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTagRequestDto,
  CreateTagResponseDto,
  DeleteTagRequestDto,
  DeleteTagResponseDto,
  FindOneTagByIdRequestDto,
  FindOneTagByIdResponseDto,
  TagMapper,
  TagRepository,
  UpdateTagRequestDto,
  UpdateTagResponseDto,
} from '../../common';
import {
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class TagService {
  @Inject(TagRepository)
  private readonly r: TagRepository;

  public async create({
    name,
    ageId,
  }: CreateTagRequestDto): Promise<CreateTagResponseDto> {
    const tag = await this.r.create(name, ageId);
    if (!tag)
      throw new GrpcInvalidArgumentException('Ошибка при создании тэга!');

    return { success: true, tag: TagMapper.mapToTagDto(tag) };
  }

  public async findId({
    tagId,
  }: FindOneTagByIdRequestDto): Promise<FindOneTagByIdResponseDto> {
    const tag = await this.r.findId(tagId);
    if (!tag) throw new GrpcNotFoundException('Ошибка при поиске тэга!');

    return { success: true, tag: TagMapper.mapToTagDto(tag) };
  }

  public async update({
    name,
    tagId,
  }: UpdateTagRequestDto): Promise<UpdateTagResponseDto> {
    const tag = await this.r.update(tagId, name);
    if (!tag) throw new GrpcNotFoundException('Ошибка при обновлении тэга!');

    return { success: true, tag: TagMapper.mapToTagDto(tag) };
  }

  public async delete({
    tagId,
  }: DeleteTagRequestDto): Promise<DeleteTagResponseDto> {
    const tag = await this.r.delete(tagId);
    if (!tag) throw new GrpcNotFoundException('Ошибка при удалении тэга!');

    return { success: true };
  }
}
