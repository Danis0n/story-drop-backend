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
  UseGuards,
} from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserDto,
  FindAllResponseDto,
  FindAnyByRequestDto,
  FindAnyByResponseDto,
  FindOneResponseDto,
} from '../utils/dto/user.dto';
import { IsAuthenticatedGuard } from '../auth/utils/guards/is-authenticated/is-authenticated.guard';

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
  // delete it, not for direct use by api
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
  ): Promise<Observable<FindOneResponseDto>> {
    throw new NotImplementedException('Not implemented yet');
  }

  @UseGuards(IsAuthenticatedGuard)
  @Delete('/:id')
  private async delete(
    @Param('id') id: string,
  ): Promise<Observable<FindOneResponseDto>> {
    throw new NotImplementedException('Not implemented yet');
  }
}
