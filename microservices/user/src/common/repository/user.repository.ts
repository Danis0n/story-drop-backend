import { Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { UserWithRelationData, UserWithRoleRelationData } from '../validation';
import {
  PRISMA_USER_CREATE_BASE_ROLE,
  PRISMA_USER_INCLUDE,
  PRISMA_USER_INCLUDE_ROLE,
} from '../constant';
import {
  CreateImageDto,
  CreateUserRequestDto,
  PrismaImageDto,
  UpdateRequestDto,
} from '../dto';
import { Logger } from '@nestjs/common';

export class UserRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async createUser(
    payload: CreateUserRequestDto,
  ): Promise<UserWithRelationData> {
    try {
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
    } catch (e) {
      Logger.error(
        `Ошибка при использовании метода createUser с параметрами ${JSON.stringify(
          payload,
        )}`,
      );
      return null;
    }
  }

  public async findAll(): Promise<UserWithRelationData[]> {
    try {
      return await this.prisma.sd_user.findMany({
        include: PRISMA_USER_INCLUDE,
      });
    } catch (e) {
      Logger.error('Ошибка при использовании метода findAll');
      return null;
    }
  }

  public async findOneId(uuid: string): Promise<UserWithRelationData> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: { user_id: uuid },
        include: PRISMA_USER_INCLUDE,
      });
    } catch (e) {
      Logger.error(
        `Ошибка при использовании метода findOneId с параметром ${uuid}`,
      );
      return null;
    }
  }

  public async findRolesId(uuid: string): Promise<UserWithRoleRelationData> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: { user_id: uuid },
        include: PRISMA_USER_INCLUDE_ROLE,
      });
    } catch (e) {
      Logger.error(
        `Ошибка при использовании метода findRolesId с параметром ${uuid}`,
      );
      return null;
    }
  }

  public async findOneUsername(
    username: string,
  ): Promise<UserWithRelationData> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: { username: username },
        include: PRISMA_USER_INCLUDE,
      });
    } catch (e) {
      Logger.error(
        `Ошибка при использовании метода findOneUsername с параметром ${username}`,
      );
    }
  }

  public async findOneIdPassword(uuid: string): Promise<{
    password: string;
  }> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: { user_id: uuid },
        select: { password: true },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время поиска хешированного пароля по uuid: ${uuid}`,
      );
      return null;
    }
  }

  public async findIdAvatar(uuid: string): Promise<{
    image: PrismaImageDto;
  }> {
    try {
      return await this.prisma.sd_user.findUnique({
        where: { user_id: uuid },
        select: { image: true },
      });
    } catch (e) {
      Logger.error(`Ошибка во время поиска аватара по uuid: ${uuid}`);
      return null;
    }
  }

  public async isExistByUsername(username: string): Promise<boolean> {
    try {
      return !!(await this.prisma.sd_user.findUnique({
        where: { username: username },
      }));
    } catch (e) {
      Logger.error(`Ошибка во время поиска по username: ${username}`);
      return null;
    }
  }

  public async isExistByEmail(email: string): Promise<boolean> {
    try {
      return !!(await this.prisma.sd_user.findUnique({
        where: { email: email },
      }));
    } catch (e) {
      Logger.error(`Ошибка во время поиска по email: ${email}`);
      return null;
    }
  }

  public async update(
    payload: UpdateRequestDto,
  ): Promise<UserWithRelationData> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: payload.uuid },
        data: {
          nickname: payload.nickname || undefined,
          sd_user_info: {
            update: {
              text: payload.text || undefined,
              contact: payload.contact || undefined,
            },
          },
        },
        include: PRISMA_USER_INCLUDE,
      });
    } catch (e) {
      Logger.error(`Ошибка во время обновления пользователя: ${payload.uuid}`);
      return null;
    }
  }

  public async updateBlocked(
    state: boolean,
    uuid: string,
  ): Promise<{
    is_blocked: boolean;
  }> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: { is_blocked: state },
        select: { is_blocked: true },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время смены состояния is_blocked по uuid: ${uuid}`,
      );
      return null;
    }
  }

  public async updateEnabled(
    state: boolean,
    uuid: string,
  ): Promise<{
    is_enabled: boolean;
  }> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: { is_enabled: state },
        select: { is_enabled: true },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время смены состояния is_enabled по uuid: ${uuid}`,
      );
      return null;
    }
  }

  public async updatePassword(
    uuid: string,
    hashedPassword: string,
  ): Promise<{
    password: string;
  }> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: { password: hashedPassword },
        select: { password: true },
      });
    } catch (e) {
      Logger.error(
        `Ошибка во время смены хешированного пароля по uuid: ${uuid}`,
      );
      return null;
    }
  }

  public async updateAvatar(
    uuid: string,
    image: CreateImageDto,
  ): Promise<{
    image: PrismaImageDto;
  }> {
    try {
      return await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: {
          image: {
            create: {
              image_id: randomUUID(),
              image_size: image.size,
              image_name: image.originalName,
              content_type: image.mimetype,
              data: image.buffer,
            },
          },
        },
        select: { image: true },
      });
    } catch (e) {
      Logger.error(`Ошибка во время обновления аватара по uuid: ${uuid}`);
      return null;
    }
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
      return null;
    }
  }

  public async deleteAvatar(uuid: string): Promise<void> {
    try {
      await this.prisma.sd_user.update({
        where: { user_id: uuid },
        data: { image: { delete: true } },
      });
    } catch (e) {
      Logger.error(`Ошибка во время удаления аватара по uuid: ${uuid}`);
      return null;
    }
  }
}
