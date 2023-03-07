import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostRequestDto,
  DeletePostResponseDto,
  FindOnePostByIdRequestDto,
  IsOwnerRequestDto,
  IsOwnerResponseDto,
  PostMapper,
  PostRepository,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from '../../common';
import { FindOnePostResponse } from '../../proto/post.pb';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';

@Injectable()
export class PostService {
  @Inject(PostRepository)
  private readonly r: PostRepository;

  public async create(
    payload: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const post = await this.r.create(payload);
    if (!post)
      throw new GrpcInvalidArgumentException('Ошибка при создании поста!');

    return { post: PostMapper.toDto(post), success: true };
  }

  // TODO: fix to postId later
  public async findId({
    postId,
  }: FindOnePostByIdRequestDto): Promise<FindOnePostResponse> {
    const post = await this.r.findId(postId);
    if (!post)
      throw new GrpcInvalidArgumentException('Ошибка при поиске поста!');

    return { post: PostMapper.toDto(post), success: true };
  }

  // TODO: delete userId
  public async update(
    payload: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    return { post: null, success: true };
  }

  public async delete({
    postId,
  }: DeletePostRequestDto): Promise<DeletePostResponseDto> {
    const post = await this.r.delete(postId);
    if (!post)
      throw new GrpcInvalidArgumentException('Ошибка при удалении поста!');

    return { success: true };
  }

  public async isOwner({
    postId,
    userId,
  }: IsOwnerRequestDto): Promise<IsOwnerResponseDto> {
    const { user_id: id } = await this.r.isOwner(postId);

    return { success: userId === id };
  }
}
