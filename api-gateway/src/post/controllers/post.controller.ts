import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';

@Controller('post')
export class PostController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }
}
