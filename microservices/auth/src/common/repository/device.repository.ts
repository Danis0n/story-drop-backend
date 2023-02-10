import { Inject, Injectable } from '@nestjs/common';
import { device as Device } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeviceDto } from '../dto';

@Injectable()
export class DeviceRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(payload: CreateDeviceDto): Promise<Device> {
    return await this.prisma.device.create({
      data: {
        device_id: payload.uuid,
        device_type: payload.deviceType,
        device_name: payload.deviceName,
        ip_address: payload.ipAddress,
      },
    });
  }
}
