import { Inject, Injectable, Logger } from '@nestjs/common';
import { device as Device } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeviceDto } from '../dto';

// TODO: add try-catch and logger

@Injectable()
export class DeviceRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(payload: CreateDeviceDto): Promise<Device> {
    try {
      return await this.prisma.device.create({
        data: {
          device_id: payload.uuid,
          device_type: payload.deviceType,
          device_name: payload.deviceName,
          ip_address: payload.ipAddress,
        },
      });
    } catch (e) {
      Logger.error(
        `Ошибка при создании девайса с параметрами: ${JSON.stringify(
          payload,
        )} `,
      );
      return null;
    }
  }

  public async delete(deviceId: string) {
    try {
      return await this.prisma.device.delete({
        where: { device_id: deviceId },
      });
    } catch (e) {
      Logger.error(`Ошибка при удаления девайса с параметром: ${deviceId} `);
      return null;
    }
  }

  public async updateIp(deviceId: string, ip: string) {
    try {
      return await this.prisma.device.update({
        where: { device_id: deviceId },
        data: { ip_address: ip },
      });
    } catch (e) {
      Logger.error(
        `Ошибка при обновлении девайса с параметрами: ${deviceId} и ${ip}`,
      );
      return null;
    }
  }

  public async findOneNameType(
    deviceName: string,
    deviceType: string,
    ipAddress: string,
  ): Promise<Device> {
    try {
      return await this.prisma.device.findFirst({
        where: {
          device_type: deviceType,
          device_name: deviceName,
          ip_address: ipAddress,
        },
      });
    } catch (e) {
      Logger.error(
        `Ошибка при поиске девайса с параметрами: ${deviceName} и ${deviceType} и ${ipAddress}`,
      );
      return null;
    }
  }
}
