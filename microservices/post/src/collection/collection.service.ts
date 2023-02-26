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
} from '../common';
import {
  GrpcInternalException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

// TODO: add create with posts
// TODO: add add post to collection_post
// TODO: add delete post from collection_post

@Injectable()
export class CollectionService {
  @Inject(CollectionMapper)
  private readonly mapper: CollectionMapper;

  @Inject(CollectionRepository)
  private readonly repository: CollectionRepository;

  public async findId({
    collectionId,
  }: FindOneCollectionByIdRequestDto): Promise<FindOneCollectionByIdResponseDto> {
    const collection = await this.repository.findId(collectionId);
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return {
      collection: this.mapper.mapToCollectionDto(collection),
      success: true,
    };
  }

  public async delete({
    collectionId,
  }: DeleteCollectionRequestDto): Promise<DeleteCollectionResponseDto> {
    const collection = await this.repository.delete(collectionId);
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return { success: true };
  }

  public async update({
    name,
    collectionId,
  }: UpdateCollectionRequestDto): Promise<UpdateCollectionResponseDto> {
    const collection = await this.repository.update(
      collectionId,
      name,
      null,
      null,
      null,
    );
    if (!collection)
      throw new GrpcNotFoundException('Коллекция с таким id не найдена!');

    return {
      collection: this.mapper.mapToCollectionDto(collection),
      success: true,
    };
  }

  public async create({
    name,
    userId,
  }: CreateCollectionRequestDto): Promise<CreateCollectionResponseDto> {
    const collection = await this.repository.create(name, userId);
    if (!collection)
      throw new GrpcInternalException('Ошибка при создании коллекции!');

    return {
      collection: this.mapper.mapToCollectionDto(collection),
      success: false,
    };
  }
}
