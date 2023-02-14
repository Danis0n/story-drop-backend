import { Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import {
  UserWithImage,
  UserWithRelationData,
  UserWithRoleRelationData,
} from '../validation';
import {
  PRISMA_USER_CREATE_BASE_ROLE,
  PRISMA_USER_INCLUDE,
  PRISMA_USER_INCLUDE_ROLE,
} from '../constant';
import { CreateUserDto } from '../dto';
import { Logger } from '@nestjs/common';
import { sd_user as User, image as Image } from '@prisma/client';

// TODO: add logger and try-catch

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

  public async findRolesId(uuid: string): Promise<UserWithRoleRelationData> {
    return await this.prisma.sd_user.findUnique({
      where: {
        user_id: uuid,
      },
      include: PRISMA_USER_INCLUDE_ROLE,
    });
  }

  public async findOneUsername(
    username: string,
  ): Promise<UserWithRelationData> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: {
          username: username,
        },
        include: PRISMA_USER_INCLUDE,
      });
    } catch (e) {
      Logger.error(
        `Ошибка при использовании метода findOneUsername с параметром ${username}`,
      );
    }
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

  public async delete(uuid: string): Promise<boolean> {
    try {
      const user = await this.prisma.sd_user.delete({
        where: { user_id: uuid },
      });
      return !!(await this.prisma.sd_user_info.delete({
        where: { info_id: user.info_id },
      }));
    } catch (e) {
      Logger.error(`Ошибка во время удаления по uuid: ${uuid}`);
    }
  }

  public async updateBlocked(state: boolean, uuid: string): Promise<User> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: { is_blocked: state },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время смены состояния is_blocked по uuid: ${uuid}`,
      );
    }
  }

  public async updateEnabled(state: boolean, uuid: string): Promise<User> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: { is_enabled: state },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время смены состояния is_enabled по uuid: ${uuid}`,
      );
    }
  }

  public async findOneIdWithAvatar(uuid: string): Promise<UserWithImage> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: { user_id: uuid },
        include: {
          image: true,
        },
      });
    } catch (e) {}
  }
}
