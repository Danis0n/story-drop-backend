import { Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { ROLE_USER } from '../../utils/config/constants';
import { CreateUserDto } from '../dto/requests.dto';
import { UserWithRelationData } from '../../prisma/utils/prisma.validate';

export class UserRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async createUser(
    payload: CreateUserDto,
  ): Promise<UserWithRelationData> {
    return await this.prisma.sd_user.create({
      data: {
        user_id: randomUUID(),
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
        sd_role_user: {
          include: { role: true },
        },
        image: true,
      },
    });
  }

  public async findAll(): Promise<UserWithRelationData[]> {
    return await this.prisma.sd_user.findMany({
      include: {
        sd_user_info: true,
        sd_role_user: {
          include: { role: true },
        },
        image: true,
      },
    });
  }
}
