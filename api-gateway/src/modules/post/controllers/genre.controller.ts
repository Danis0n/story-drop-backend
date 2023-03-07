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
  CreateGenreRequestDto,
  CreateGenreResponseDto,
  DeleteGenreResponseDto,
  FindManyGenreByNameRequestDto,
  FindManyGenreByNameResponseDto,
  FindOneGenreByIdResponseDto,
  IsAuthenticatedGuard,
  RoleGuard,
  Roles,
  UpdateGenreRequestDto,
  UpdateGenreResponseDto,
} from '../../../common';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('api/genre')
export class GenreController implements OnModuleInit {
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
    @Body() payload: CreateGenreRequestDto,
  ): Promise<Observable<CreateGenreResponseDto>> {
    return this.serviceClient.createGenre(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Get('/:id')
  private async findOneId(
    @Param('id') uuid: string,
  ): Promise<Observable<FindOneGenreByIdResponseDto>> {
    return this.serviceClient.findOneGenreById({ genreId: uuid });
  }

  @Get('name')
  private async findNameMany(
    @Query() payload: FindManyGenreByNameRequestDto,
  ): Promise<Observable<FindManyGenreByNameResponseDto>> {
    return this.serviceClient.findManyGenreByName(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Patch('/:id')
  private async update(
    @Param('id') uuid: string,
    @Body() payload: UpdateGenreRequestDto,
  ): Promise<Observable<UpdateGenreResponseDto>> {
    payload.genreId = uuid;
    return this.serviceClient.updateGenre(payload);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  @Roles('Admin')
  @UseGuards(IsAuthenticatedGuard, RoleGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') uuid: string,
  ): Promise<Observable<DeleteGenreResponseDto>> {
    return this.serviceClient.deleteGenre({ genreId: uuid });
  }
}
