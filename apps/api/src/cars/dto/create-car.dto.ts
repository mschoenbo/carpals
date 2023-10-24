import { FuelType } from '@prisma/client';

export type CreateCarDto = {
  make: string;
  model: string;
  year: Date;
  color: string;
  fuel: FuelType;
  fin?: string;
};
