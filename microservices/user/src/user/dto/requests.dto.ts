import { CreateUser } from '../proto/user.pb';
import { IsOptional } from 'class-validator';

export class CreateUserDto implements CreateUser {
  public readonly username: string;
  public readonly email: string;
  public readonly nickname: string;
  public readonly password: string;
  @IsOptional()
  public readonly text: string;
  @IsOptional()
  public readonly contact: string;
}
