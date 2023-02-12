import { Inject, Injectable } from '@nestjs/common';
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
  }

  public async findOneDevice(deviceId: string) {
    return await this.prisma.session.findFirst({
      where: {
        device_id: deviceId,
      },
    });
  }

  public async delete(sessionId: string) {
    return await this.prisma.session.delete({
      where: {
        session_id: sessionId,
      },
    });
  }

  public async findOneIdWithRelations(
    sessionId: string,
  ): Promise<SessionWithRelationData> {
    return await this.prisma.session.findUnique({
      where: {
        session_id: sessionId,
      },
      include: { device: true },
    });
  }

  public async findOneId(sessionId: string) {
    return await this.prisma.session.findUnique({
      where: {
        session_id: sessionId,
      },
    });
  }
}
