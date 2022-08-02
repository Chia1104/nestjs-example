import { z } from 'zod';

export const uuidSchema = z.string().uuid();

export type uuid = z.infer<typeof uuidSchema>;
