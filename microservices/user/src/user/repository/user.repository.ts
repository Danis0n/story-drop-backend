import {
  sd_user as UserEntity,
  sd_user_info as UserInfoEntity,
  role as RoleEntity,
  image as ImageEntity,
  sd_role_user as RoleUserEntity,
  Prisma,
} from '@prisma/client';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { ROLE_USER } from '../../utils/config/constants';
import { CreateUserDto } from '../dto/requests.dto';
import {
  userInclude,
  UserWithInclude,
} from '../../prisma/utils/prisma.validate';

export class UserRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async test() {
    const user: UserWithInclude[] = await this.prisma.sd_user.findMany({
      include: userInclude,
    });
  }

  public async createUser(payload: CreateUserDto): Promise<UserWithInclude> {
    const uuid: string = randomUUID();

    const user: UserWithInclude = await this.prisma.sd_user.create({
      data: {
        user_id: uuid,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        nickname: payload.nickname,
        is_enabled: false,
        is_blocked: false,
        sd_role_user: {
          create: [
            {
              role_id: ROLE_USER,
            },
          ],
        },
        sd_user_info: {
          create: {
            text: payload.text,
            contact: payload.contact,
          },
        },
      },
      include: {
        sd_user_info: true,
        sd_role_user: true,
        image: true,
      },
    });

    user.sd_role_user.map((role) => {
      console.log(role.role_id);
    });

    return user;
  }
}
