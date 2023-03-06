import { Inject, Injectable } from '@nestjs/common';
import {
  CollectionMapper,
  CollectionRepository,
  CreateCollectionRequestDto,
  CreateCollectionResponseDto,
  DeleteCollectionRequestDto,
  DeleteCollectionResponseDto,
  FindManyCollectionByNameRequestDto,
  FindManyCollectionByNameResponseDto,
  FindManyCollectionByUserIdRequestDto,
  FindManyCollectionByUserIdResponseDto,
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
      CollectionMapper.mapToPrismaPostIds(postIds),
    );
    if (!collection)
      throw new GrpcInternalException('Ошибка при создании коллекции!');

    return {
      collection: CollectionMapper.toDto(collection),
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
      collection: CollectionMapper.toDto(collection),
      success: true,
    };
  }

  public async findUserId({
    userId,
  }: FindManyCollectionByUserIdRequestDto): Promise<FindManyCollectionByUserIdResponseDto> {
    const collections = await this.r.findUserId(userId);

    return {
      collections:
        collections.map((collection) => {
          return CollectionMapper.toDto(collection);
        }) || [],
    };
  }

  public async findManyName({
    name,
  }: FindManyCollectionByNameRequestDto): Promise<FindManyCollectionByNameResponseDto> {
    const collections = await this.r.findManyName(name);

    return {
      collections:
        collections.map((collection) => {
          return CollectionMapper.toDto(collection);
        }) || [],
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
      CollectionMapper.mapToPrismaPostIds(postIdsInsert),
      CollectionMapper.mapToPrismaPostIds(postIdsDelete),
    );
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return {
      collection: CollectionMapper.toDto(collection),
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
