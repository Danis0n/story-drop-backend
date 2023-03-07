import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from './post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  IsOwnerChapterRequestDto,
  IsOwnerChapterResponseDto,
  IsOwnerRequestDto,
  IsOwnerResponseDto,
} from '../../common';
import { firstValueFrom } from 'rxjs';

// TODO: check if user owns post
// TODO: check if beta has access to post
@Injectable()
export class PostService implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  public async isOwner(
    payload: IsOwnerRequestDto,
  ): Promise<IsOwnerResponseDto> {
    return await firstValueFrom(this.serviceClient.isOwner(payload));
  }

  public async isOwnerChapter(
    payload: IsOwnerChapterRequestDto,
  ): Promise<IsOwnerChapterResponseDto> {
    return await firstValueFrom(this.serviceClient.isOwnerChapter(payload));
  }
}
