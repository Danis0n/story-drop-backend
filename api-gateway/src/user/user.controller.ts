import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindAllResponseDto,
  FindOneResponseDto,
  UpdateAvatarResponseDto,
  IsAuthenticatedGuard,
  mapToUpdateUser,
  mapToUpdateImage,
  UpdateAvatarDto,
  UpdateDto,
} from '../common';

// TODO: make search by nicknames

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
}
