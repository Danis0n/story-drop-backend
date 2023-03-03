import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostRequestDto,
  DeletePostResponseDto,
  FindOnePostByIdRequestDto,
  PostMapper,
  PostRepository,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from '../../common';
import { FindOnePostResponse } from '../../proto/post.pb';

@Injectable()
export class PostService {
  @Inject(PostMapper)
  private readonly m: PostMapper;

  @Inject(PostRepository)
  private readonly r: PostRepository;

  public async create(
    payload: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return undefined;
  }

  // TODO: fix to postId later
  public async findId({
    uuid,
  }: FindOnePostByIdRequestDto): Promise<FindOnePostResponse> {
    return undefined;
  }

  public async update(
    payload: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    return undefined;
  }

  public async delete({
    userId,
    postId,
  }: DeletePostRequestDto): Promise<DeletePostResponseDto> {
    return undefined;
  }
}
