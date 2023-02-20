import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('collection')
export class CollectionController implements OnModuleInit {
  private postServiceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly postClient: ClientGrpc;

  public onModuleInit(): void {
    this.postServiceClient =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
  }
}
