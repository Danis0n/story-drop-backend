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

  public async delete(deviceId: string) {
    return await this.prisma.device.delete({
      where: { device_id: deviceId },
    });
  }

  public async findOneNameType(
    deviceName: string,
    deviceType: string,
    ipAddress: string,
  ): Promise<Device> {
    return await this.prisma.device.findFirst({
      where: {
        device_type: deviceType,
        device_name: deviceName,
        ip_address: ipAddress,
      },
    });
  }
}
