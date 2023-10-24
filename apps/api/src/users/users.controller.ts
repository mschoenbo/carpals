import { Controller, Get, Request } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';

@Controller('users')
export class UsersController {
  constructor(private carsService: CarsService) {}

  @Get('cars')
  async getCarsOfUser(@Request() req) {
    return this.carsService.getCarsByUser(req.user.sub);
  }
}
