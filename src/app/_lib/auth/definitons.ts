import { z } from 'zod';

export const SignUpFormSchema = z.object({
    name: z.string().nonempty({ message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email cannot be empty" }),
    password: z.string().nonempty({ message: "Password cannot be empty" }).min(8, { message: "Password must be at least 8 characters long" }),
})

export const SignInFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email cannot be empty" }),
    password: z.string().nonempty({ message: "Password cannot be empty" }),
})
