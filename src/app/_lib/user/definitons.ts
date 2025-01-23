import { z } from 'zod';

export type role = 'ADMIN' | 'USER';

export const editUserSchema = z.object({
    id: z.number().int({ message: "ID must be an integer" }).nullable(),
    name: z.string().nonempty({ message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email cannot be empty" }),
    password: z.string().nonempty({ message: "Password cannot be empty" }),
    role: z.string(),
})