import { Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/requests.dto';
import { UserWithRelationData } from '../../prisma/utils/prisma.validate';
import {
  PRISMA_USER_CREATE_BASE_ROLE,
  PRISMA_USER_INCLUDE,
} from '../../prisma/utils/prisma.constants';

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
        sd_role_user: PRISMA_USER_CREATE_BASE_ROLE,
        sd_user_info: {
          create: {
            text: payload.text,
            contact: payload.contact,
          },
        },
      },
      include: PRISMA_USER_INCLUDE,
    });
  }

  public async findAll(): Promise<UserWithRelationData[]> {
    return await this.prisma.sd_user.findMany({
      include: PRISMA_USER_INCLUDE,
    });
  }

  public async findOneId(uuid: string): Promise<UserWithRelationData> {
    return await this.prisma.sd_user.findUnique({
      where: {
        user_id: uuid,
      },
      include: PRISMA_USER_INCLUDE,
    });
  }

  public async isExistByUsername(username: string): Promise<boolean> {
    return !!(await this.prisma.sd_user.findUnique({
      where: {
        username: username,
      },
    }));
  }

  public async isExistByEmail(email: string): Promise<boolean> {
    return !!(await this.prisma.sd_user.findUnique({
      where: {
        email: email,
      },
    }));
  }
}
