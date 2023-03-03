import { Inject, Injectable } from '@nestjs/common';
import {
  CollectionMapper,
  CollectionRepository,
  CreateCollectionRequestDto,
  CreateCollectionResponseDto,
  DeleteCollectionRequestDto,
  DeleteCollectionResponseDto,
  FindOneCollectionByIdRequestDto,
  FindOneCollectionByIdResponseDto,
  UpdateCollectionRequestDto,
  UpdateCollectionResponseDto,
} from '../../common';
import {
  GrpcInternalException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class CollectionService {
  @Inject(CollectionMapper)
  private readonly m: CollectionMapper;

  @Inject(CollectionRepository)
  private readonly r: CollectionRepository;

  public async create({
    name,
    userId,
    postIds,
  }: CreateCollectionRequestDto): Promise<CreateCollectionResponseDto> {
    const collection = await this.r.create(
      name,
      userId,
      this.m.mapToPrismaPostIds(postIds),
    );
    if (!collection)
      throw new GrpcInternalException('Ошибка при создании коллекции!');

    return {
      collection: this.m.mapToCollectionDto(collection),
      success: true,
    };
  }

  public async findId({
    collectionId,
  }: FindOneCollectionByIdRequestDto): Promise<FindOneCollectionByIdResponseDto> {
    const collection = await this.r.findId(collectionId);
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return {
      collection: this.m.mapToCollectionDto(collection),
      success: true,
    };
  }

  public async update({
    name,
    collectionId,
    postIdsInsert,
    postIdsDelete,
    isHidden,
  }: UpdateCollectionRequestDto): Promise<UpdateCollectionResponseDto> {
    const collection = await this.r.update(
      collectionId,
      name,
      isHidden,
      this.m.mapToPrismaPostIds(postIdsInsert),
      this.m.mapToPrismaPostIds(postIdsDelete),
    );
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return {
      collection: this.m.mapToCollectionDto(collection),
      success: true,
    };
  }

  public async delete({
    collectionId,
  }: DeleteCollectionRequestDto): Promise<DeleteCollectionResponseDto> {
    const collection = await this.r.delete(collectionId);
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return { success: true };
  }
}
