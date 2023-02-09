import { Inject, Injectable } from '@nestjs/common';
import {
  device as DeviceEntity,
  session as SessionEntity,
} from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SessionWithRelationData } from '../validation';
import { CreateSessionDto } from '../dto';
import { SESSION_LIVE_TIME } from '../constant';
import { randomUUID } from 'crypto';

@Injectable()
export class SessionRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(
    payload: CreateSessionDto,
  ): Promise<SessionWithRelationData> {
    return await this.prisma.session.create({
      data: {
        session_id: payload.sessionId,
        user_id: payload.userId,
        sing_in: new Date(),
        expire_at: new Date(SESSION_LIVE_TIME),
        device: {
          create: {
            device_id: randomUUID(),
            device_name: '',
            device_type: '',
            ip_address: '',
          },
        },
      },
      include: {
        device: true,
      },
    });
  }
}
