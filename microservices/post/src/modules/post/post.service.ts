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

    const postId = post.post_id;

    await this.insertGenres(postId, payload.genreIds);
    await this.insertTags(postId, payload.tagIds);
    await this.insertFandoms(postId, payload.fandomIds);
    await this.insertCharacters(postId, payload.characterIds);
    await this.insertParings(postId, payload.paringIds);

    return { postId: postId, success: true };
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
    const post = await this.r.update(payload);
    if (!post)
      throw new GrpcInvalidArgumentException('Ошибка при обновлении поста!');

    const postId = payload.postId;

    await this.insertGenres(postId, payload.insertGenres);
    await this.insertTags(postId, payload.insertTags);

    await this.deleteTags(postId, payload.deleteTags);
    await this.deleteGenres(postId, payload.deleteGenres);

    return { postId: postId, success: true };
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

  private async insertGenres(postId: string, ids: string[]) {
    ids && ids.length > 0 ? await this.r.insertGenres(postId, ids) : null;
  }

  private async insertTags(postId: string, ids: string[]) {
    ids && ids.length > 0 ? await this.r.insertTags(postId, ids) : null;
  }

  private async insertCharacters(postId: string, ids: string[]) {
    ids && ids.length > 0 ? await this.r.insertCharacters(postId, ids) : null;
  }

  private async insertFandoms(postId: string, ids: string[]) {
    ids && ids.length > 0 ? await this.r.insertFandoms(postId, ids) : null;
  }

  private async insertParings(postId: string, ids: string[]) {
    ids && ids.length > 0 ? await this.r.insertParings(postId, ids) : null;
  }

  private async deleteGenres(postId: string, ids: string[]) {
    if (ids && ids.length > 0) return;
    for (const genre in ids) {
      const deleted = await this.r.deleteGenre(postId, genre);
      if (!deleted)
        throw new GrpcInvalidArgumentException(
          'Ошибка при удалении жанра с поста!',
        );
    }
  }

  private async deleteTags(postId: string, ids: string[]) {
    if (ids && ids.length > 0) return;
    for (const tag in ids) {
      const deleted = await this.r.deleteTag(postId, tag);
      if (!deleted)
        throw new GrpcInvalidArgumentException(
          'Ошибка при удалении тэга с поста!',
        );
    }
  }
}
