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
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterResponseDto,
  FindOneCharacterByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';

@Controller('character')
export class CharacterController implements OnModuleInit {
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
    @Body() payload: CreateCharacterRequestDto,
  ): Promise<Observable<CreateCharacterResponseDto>> {
    return this.serviceClient.createCharacter(payload);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneCharacterByIdResponseDto>> {
    return this.serviceClient.findOneCharacterById({ characterId: uuid });
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Patch('/:id')
  private async update(
    @Param('id') uuid: string,
    @Body() payload: UpdateCharacterRequestDto,
  ): Promise<Observable<UpdateCharacterResponseDto>> {
    payload.characterId = uuid;
    return this.serviceClient.updateCharacter(payload);
  }

  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteCharacterResponseDto>> {
    return this.serviceClient.deleteCharacter({ characterId: uuid });
  }
}
