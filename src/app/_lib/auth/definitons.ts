import { z } from 'zod';

export const SignUpFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})
