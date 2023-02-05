import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotImplementedException,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateUser,
  FindAllResponse,
  FindOneByRequest,
  FindOneResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

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
  private async findAll(): Promise<Observable<FindAllResponse>> {
    return this.userServiceClient.findAll({});
  }

  @Get()
  private async findOneBy(
    @Query() params: FindOneByRequest,
  ): Promise<Observable<FindOneResponse>> {
    return this.userServiceClient.findOneBy(params);
  }

  // test
  // use register in auth module instead
  @Post()
  private async create(
    @Body() createUser: CreateUser,
  ): Promise<Observable<FindOneResponse>> {
    return this.userServiceClient.create(createUser);
  }

  @Get('/:id')
  private async findOneId(
    @Param('id') id: string,
  ): Promise<Observable<FindOneResponse>> {
    return this.userServiceClient.findOneId({ uuid: id });
  }

  @Put('/:id')
  private async update(
    @Param('id') id: string,
  ): Promise<Observable<FindOneResponse>> {
    throw new NotImplementedException('Not implemented yet');
  }

  @Delete('/:id')
  private async delete(
    @Param('id') id: string,
  ): Promise<Observable<FindOneResponse>> {
    throw new NotImplementedException('Not implemented yet');
  }
}
