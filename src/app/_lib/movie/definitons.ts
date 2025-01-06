import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.number().nullable(),
    title: z.string(),
    year: z.number(),
    director: z.string(),
    genre: z.string(),
    description: z.string(),
    duration: z.number(),
})