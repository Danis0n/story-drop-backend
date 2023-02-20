import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('collection')
export class CollectionController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }
}
