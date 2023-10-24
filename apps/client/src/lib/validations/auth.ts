import {z} from 'zod';

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  givenName: z.string(),
  familyName: z.string(),
});
