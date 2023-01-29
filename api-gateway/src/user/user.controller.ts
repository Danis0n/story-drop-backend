import {
  Controller,
  Delete,
  Get,
  Inject,
  NotImplementedException,
  OnModuleInit,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import {
  FindAllResponse,
  FindOneByRequest,
  User,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
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
  ): Promise<Observable<User>> {
    return this.userServiceClient.findOneBy(params);
  }

  @Get('/:id')
  private async findOneId(@Param('id') id: string): Promise<Observable<User>> {
    return this.userServiceClient.findOneId({ uuid: id });
  }

  @Put('/:id')
  private async update(@Param('id') id: string): Promise<Observable<any>> {
    throw new NotImplementedException('Not implemented yet');
  }

  @Delete('/:id')
  private async delete(@Param('id') id: string): Promise<Observable<any>> {
    throw new NotImplementedException('Not implemented yet');
  }
}
