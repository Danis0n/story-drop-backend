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

  public async findId({
    postId,
  }: FindOnePostByIdRequestDto): Promise<FindOnePostResponse> {
    const post = await this.r.findId(postId);
    if (!post)
      throw new GrpcInvalidArgumentException('Ошибка при поиске поста!');

    return { post: PostMapper.toDto(post), success: true };
  }

  public async update(
    payload: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    const postId = payload.postId;
    const deleteTags: string[] = payload.deleteTags;
    const deleteGenres: string[] = payload.deleteGenres;

    if (deleteTags && deleteTags.length > 0) {
      await this.deleteTags(deleteTags, postId);
    }

    if (deleteGenres && deleteGenres.length > 0) {
      await this.deleteGenres(deleteGenres, postId);
    }

    const post = await this.r.update(payload);
    if (!post)
      throw new GrpcInvalidArgumentException('Ошибка при обновлении поста!');

    return { post: PostMapper.toDto(post), success: true };
  }

  public async deleteGenres(deleteGenres: string[], postId: string) {
    for (const genre in deleteGenres) {
      const deleted = await this.r.deleteGenre(postId, genre);
      if (!deleted)
        throw new GrpcInvalidArgumentException(
          'Ошибка при удалении жанра с поста!',
        );
    }
  }
  public async deleteTags(deleteTags: string[], postId: string) {
    for (const tag in deleteTags) {
      const deleted = await this.r.deleteTag(postId, tag);
      if (!deleted)
        throw new GrpcInvalidArgumentException(
          'Ошибка при удалении тэга с поста!',
        );
    }
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
