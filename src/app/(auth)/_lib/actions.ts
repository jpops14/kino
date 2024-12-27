'use server'

import prisma from "@/app/_db/db";
import { SignInFormSchema, SignUpFormSchema } from "./definitons"
import { handlePrismaError } from "@/app/_db/utils";
import { createSession } from "./session";

export const signUp = async (state, formData: FormData) => {
    
    const validationResult = SignUpFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validationResult.data;
    
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        }
    }).then(
        (user) => { 
            console.debug(`user #${user.id} created`)
            console.debug(`^ user: ${JSON.stringify(user)}`)
            return user;
        }
    ).catch(
        handlePrismaError
    );

    await createSession({ name, email });
}

export const signIn = async (state, formData: FormData) => {
    
    const validationResult = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validationResult.data;
    
    const user = await prisma.user.findFirst(
        {
            where: {
                email: email,
                password: password,
            }
        }
    ).then(
        (user) => { 
            console.debug(user ? `user #${user.id} found` : 'user not found')
            console.debug(`^ user: ${JSON.stringify(user)}`)
            return user;
        }
    ).catch(
        handlePrismaError
    )

    if (!user) {
        return {
            errors: {
                general: 'Invalid credentials',
            }
        }
    }

    await createSession({ name: user.name, email: user.email });
}