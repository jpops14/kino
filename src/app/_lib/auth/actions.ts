'use server'

import prisma from "@/app/_db/db";
import { SignInFormSchema, SignUpFormSchema } from "./definitons"
import { handlePrismaError } from "@/app/_db/utils";
import { createSession, deleteSession, hashPassword, verifyPassword } from "./session";

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

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
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

    if (user) {
        await createSession({ id: user.id, name, email, role: user.role as ('ADMIN' | 'USER') });
    } else {
        console.error ('ERROR: COULD NOT CREATE USER');
    }
    return { success: true };
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

    const verified = await verifyPassword(password, user.password);

    if(!verified) {
        return {
            errors: {
                general: 'Invalid credentials',
            }
        }
    }

    await createSession({ id: user.id, name: user.name, email: user.email, role: user.role as ('ADMIN' | 'USER') });
    return { success: true };
}

export const signOut = async () => deleteSession();