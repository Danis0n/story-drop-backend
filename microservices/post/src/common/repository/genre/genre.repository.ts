import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { GenrePrisma } from 'src/common/dto/genre/genre-prisma.interface';

@Injectable()
export class GenreRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  public async create(name: string): Promise<GenrePrisma> {
    try {
      return await this.prisma.genre.create({
        data: {
          genre_name: randomUUID(),
          genre_id: name,
        },
      });
    } catch (e) {
      Logger.error(
        `create: Ошибка во время создания жанра: ${name}. ${e?.message}`,
      );
      return null;
    }
  }

  public async update(name: string, genreId: string): Promise<GenrePrisma> {
    try {
      return await this.prisma.genre.update({
        where: { genre_id: genreId },
        data: { genre_name: name },
      });
    } catch (e) {
      Logger.error(
        `update: Ошибка во время обновлении жанра: ${name}, ${genreId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async delete(genreId: string): Promise<GenrePrisma> {
    try {
      return await this.prisma.genre.delete({
        where: { genre_id: genreId },
      });
    } catch (e) {
      Logger.error(
        `delete: Ошибка во время удалени жанра: ${genreId}. ${e?.messagee}`,
      );
      return null;
    }
  }

  public async findId(genreId: string): Promise<GenrePrisma> {
    try {
      return await this.prisma.genre.findUnique({
        where: { genre_id: genreId },
      });
    } catch (e) {
      Logger.error(
        `findId: Ошибка во время поиска жанра по id: ${genreId}. ${e?.message}`,
      );
      return null;
    }
  }

  public async findName(name: string): Promise<GenrePrisma> {
    try {
      return await this.prisma.genre.findUnique({
        where: { genre_name: name },
      });
    } catch (e) {
      Logger.error(
        `findName: Ошибка во время поиска жанра по имени: ${name}. ${e}`,
      );
      return null;
    }
  }

  public async findNameMany(name: string): Promise<GenrePrisma[]> {
    try {
      return await this.prisma.genre.findMany({
        where: { genre_name: { contains: name, mode: 'insensitive' } },
      });
    } catch (e) {
      Logger.error(
        `findNameMany: Ошибка во время поиска жанраво по имени: ${name}. ${e}`,
      );
      return null;
    }
  }
}
