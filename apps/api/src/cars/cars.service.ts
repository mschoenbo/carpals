import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, dto: CreateCarDto): Promise<Car> {
    return this.prismaService.car.create({
      data: {
        ...dto,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getCarsByUser(userId: string): Promise<Car[]> {
    return this.prismaService.car.findMany({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  async getCarById(id: string): Promise<Car> {
    return this.prismaService.car.findUnique({
      where: {
        id,
      },
    });
  }
}
