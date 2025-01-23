import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.number().int({ message: "ID must be an integer" }).nullable(),
    title: z.string().nonempty({ message: "Title cannot be empty" }),
    year: z.number().int({ message: "Year must be an integer" }).positive({ message: "Year must be a positive integer" }),
    director: z.string().nonempty({ message: "Director cannot be empty" }),
    genre: z.string().nonempty({ message: "Genre cannot be empty" }),
    description: z.string().nonempty({ message: "Description cannot be empty" }),
    duration: z.number().int({ message: "Duration must be an integer" }).positive({ message: "Duration must be a positive integer" }),
})