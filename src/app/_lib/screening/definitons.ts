import { z } from 'zod';

export const editScreeningSchema = z.object({
    id: z.number().int({ message: "ID must be an integer" }).nullable(),
    start: z.date({ message: "Start must be a valid date" }),
    movie_id: z.number().int({ message: "Movie ID must be an integer" }).positive({ message: "Movie ID must be a positive integer" }),
    room_id: z.number().int({ message: "Room ID must be an integer" }).positive({ message: "Room ID must be a positive integer" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
})
