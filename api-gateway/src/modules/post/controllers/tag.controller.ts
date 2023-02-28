import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateTagRequestDto,
  CreateTagResponseDto,
  DeleteTagResponseDto,
  FindOneTagByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateTagRequestDto,
  UpdateTagResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';

@Controller('tag')
export class TagController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post()
  private async create(
    @Body() payload: CreateTagRequestDto,
  ): Promise<Observable<CreateTagResponseDto>> {
    return this.serviceClient.createTag(payload);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneTagByIdResponseDto>> {
    return this.serviceClient.findOneTagById({ tagId: uuid });
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Patch('/:id')
  private async update(
    @Param('id') tagId: string,
    @Body() payload: UpdateTagRequestDto,
  ): Promise<Observable<UpdateTagResponseDto>> {
    payload.tagId = tagId;
    return this.serviceClient.updateTag(payload);
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') tagId: string,
  ): Promise<Observable<DeleteTagResponseDto>> {
    return this.serviceClient.deleteTag({ tagId: tagId });
  }
}
