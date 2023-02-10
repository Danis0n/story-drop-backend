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
    return await this.prisma.session.create({
      data: {
        session_id: sessionId,
        user_id: userId,
        sing_in: new Date(),
        expire_at: new Date(SESSION_LIVE_TIME),
        device: {
          connect: { device_id: deviceId },
        },
      },
      include: {
        device: true,
      },
    });
  }
}
