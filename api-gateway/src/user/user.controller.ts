import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotImplementedException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserDto,
  DeleteResponseDto,
  FindAllResponseDto,
  FindAnyByRequestDto,
  FindAnyByResponseDto,
  FindOneResponseDto,
  UpdateAvatarDto,
  UpdateAvatarResponseDto,
  UpdateDto,
} from '../utils/dto/user.dto';
import { IsAuthenticatedGuard } from '../utils/guards/is-authenticated/is-authenticated.guard';
import { mapToUpdateImage } from '../utils/mapper/image.mapper';
import { mapToUpdateUser } from '../utils/mapper/user.mapper';

@Controller('api/users')
export class UserController implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly userClient: ClientGrpc;

  public onModuleInit(): void {
    this.userServiceClient =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get()
  private async findAll(): Promise<Observable<FindAllResponseDto>> {
    return this.userServiceClient.findAll({});
  }

  @Put('validate')
  private async findOneBy(
    @Query() params: FindAnyByRequestDto,
  ): Promise<Observable<FindAnyByResponseDto>> {
    return this.userServiceClient.findAnyExistBy(params);
  }

  // test
  // use register in auth module instead
  // delete it, not for direct use by frontend
  @Post()
  private async create(
    @Body() createUser: CreateUserDto,
  ): Promise<Observable<FindOneResponseDto>> {
    return this.userServiceClient.create(createUser);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') id: string,
  ): Promise<Observable<FindOneResponseDto>> {
    return this.userServiceClient.findOneId({ uuid: id });
  }

  @UseGuards(IsAuthenticatedGuard)
  @Patch('/:id')
  private async update(
    @Param('id') id: string,
    @Body() payload: UpdateDto,
  ): Promise<Observable<FindOneResponseDto>> {
    return this.userServiceClient.update(mapToUpdateUser(id, payload));
  }

  @UseGuards(IsAuthenticatedGuard)
  @Put('/:id/image')
  private async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UpdateAvatarDto,
  ): Promise<Observable<UpdateAvatarResponseDto>> {
    return this.userServiceClient.updateAvatar(
      mapToUpdateImage(id, file, payload),
    );
  }

  @UseGuards(IsAuthenticatedGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') id: string,
  ): Promise<Observable<DeleteResponseDto>> {
    return this.userServiceClient.delete({ uuid: id });
  }
}
