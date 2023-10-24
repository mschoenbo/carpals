import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CarsService, PrismaService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
