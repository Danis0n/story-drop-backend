import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SessionWithRelationData } from '../validation';
import { CreateSessionDto } from '../dto';
import { SESSION_LIVE_TIME } from '../constant';

@Injectable()
export class SessionRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create({
    sessionId,
    userId,
    deviceId,
  }: CreateSessionDto): Promise<SessionWithRelationData> {
    const signIn = new Date();
    const expireAt = new Date(signIn.getTime() + SESSION_LIVE_TIME);

    try {
      return await this.prisma.session.create({
        data: {
          session_id: sessionId,
          user_id: userId,
          sing_in: signIn,
          expire_at: expireAt,
          device: {
            connect: { device_id: deviceId },
          },
        },
        include: {
          device: true,
        },
      });
    } catch (e) {
      Logger.error(
        `Ошибка при создании сессии с параметрами: ${sessionId}, ${userId}, ${deviceId}`,
      );
      return null;
    }
  }

  public async findOneDevice(deviceId: string) {
    try {
      return await this.prisma.session.findFirst({
        where: {
          device_id: deviceId,
        },
      });
    } catch (e) {
      Logger.error(`Ошибка при поиске сессии с параметром: ${deviceId}`);
      return null;
    }
  }

  public async delete(sessionId: string) {
    try {
      return await this.prisma.session.delete({
        where: {
          session_id: sessionId,
        },
      });
    } catch (e) {
      Logger.error(`Ошибка при удалении сессии с параметрами: ${sessionId}`);
      return null;
    }
  }

  public async findOneIdWithRelations(
    sessionId: string,
  ): Promise<SessionWithRelationData> {
    try {
      return await this.prisma.session.findUnique({
        where: {
          session_id: sessionId,
        },
        include: { device: true },
      });
    } catch (e) {
      Logger.error(`Ошибка при поиске сессии с параметром: ${sessionId}`);
      return null;
    }
  }

  public async findOneId(sessionId: string) {
    try {
      return await this.prisma.session.findUnique({
        where: {
          session_id: sessionId,
        },
      });
    } catch (e) {
      Logger.error(`Ошибка при поиске сессии с параметром: ${sessionId}`);
      return null;
    }
  }
}
