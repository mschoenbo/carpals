import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateCarDto) {
    return this.carsService.create(req.user.sub, dto);
  }

  @Get(':id')
  async getById(@Request() req, @Param('id') id: string) {
    return this.carsService.getCarById(id);
  }
}
