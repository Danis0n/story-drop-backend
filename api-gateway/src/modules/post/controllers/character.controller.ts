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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { POST_SERVICE_NAME, PostServiceClient } from '../post.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
  DeleteCharacterResponseDto,
  FindManyCharacterByFandomRequestDto,
  FindManyCharacterByFandomResponseDto,
  FindManyCharacterByNameRequestDto,
  FindManyCharacterByNameResponseDto,
  FindManyCharacterByParingRequestDto,
  FindManyCharacterByParingResponseDto,
  FindOneCharacterByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/character')
export class CharacterController implements OnModuleInit {
  private serviceClient: PostServiceClient;

  @Inject(POST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.serviceClient =
      this.client.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(IsAuthenticatedGuard)
  @Post()
  private async create(
    @Body() payload: CreateCharacterRequestDto,
  ): Promise<Observable<CreateCharacterResponseDto>> {
    return this.serviceClient.createCharacter(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneCharacterByIdResponseDto>> {
    return this.serviceClient.findOneCharacterById({ characterId: uuid });
  }

  @Get('name')
  private async findNameMany(
    @Query() payload: FindManyCharacterByNameRequestDto,
  ): Promise<Observable<FindManyCharacterByNameResponseDto>> {
    return this.serviceClient.findManyCharacterByName(payload);
  }

  @Get('fandom')
  private async findCharacterId(
    @Query() payload: FindManyCharacterByFandomRequestDto,
  ): Promise<Observable<FindManyCharacterByFandomResponseDto>> {
    return this.serviceClient.findManyCharacterByFandom(payload);
  }

  @Get('paring')
  private async findParingId(
    @Query() payload: FindManyCharacterByParingRequestDto,
  ): Promise<Observable<FindManyCharacterByParingResponseDto>> {
    return this.serviceClient.findManyCharacterByParing(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
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

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteCharacterResponseDto>> {
    return this.serviceClient.deleteCharacter({ characterId: uuid });
  }
}
