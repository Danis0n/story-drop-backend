import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { device as DeviceEntity } from '@prisma/client';

@Injectable()
export class DeviceRepository {
  public async create(): Promise<DeviceEntity> {
    return null;
  }
}
