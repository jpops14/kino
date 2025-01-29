import { z } from 'zod';

export const NewsSchema = z.object({
    id: z.number().int({ message: "ID must be an integer" }).nullable(),
    title: z.string().nonempty({ message: "Title cannot be empty" }),
    subtitle: z.string().nonempty({ message: "Subtitle cannot be empty" }),
    content: z.string().nonempty({ message: "Content cannot be empty" }),
    publication: z.date({ message: "Publication date must be a valid date" }),
});