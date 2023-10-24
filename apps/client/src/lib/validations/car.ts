import {z} from 'zod';

export const carUpdateSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.date(),
  fin: z.string().optional(),
  color: z.string().optional(),
  fuel: z.enum(['GAS', 'DIESEL', 'EV']),
});
