import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';

@Controller('post')
export class PostController implements OnModuleInit {
  private postServiceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly postClient: ClientGrpc;

  public onModuleInit(): void {
    this.postServiceClient =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
  }
}
