'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { editUserSchema } from "./definitons";
import { redirect } from "next/navigation";
import { hashPassword, verifySession } from "../auth/session";

export const editUser = async (state, formData: FormData) => {
    const session = await verifySession();
    
    if (!session || session.role !== 'ADMIN') {
        redirect('/admin/users');
    }

    const idString = formData.get('id')?.toString();
    
    const validationResult = editUserSchema.safeParse({
        id: idString ? parseInt(idString) : null,
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { id, name, email, password, role } = validationResult.data;

    const hashedPassword = await hashPassword(password);
    
    const userOperation = id ? prisma.user.update({
        where: { id: id },
        data: {
            id: id,
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        }
    }) : prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        }
    })


    const user = await userOperation.then(
        (user) => { 
            console.debug(`user #${user.id} created`)
            console.debug(`^ user: ${JSON.stringify(user)}`)
            return user;
        }
    ).catch(
        handlePrismaError
    );

    if (user) {
       return { success: true }
    } else {
        console.error ('ERROR: COULD NOT CREATE USER');
        return {
            errors: {
                general: 'Could not create user'
            }
        }
    }
}

export const getAdminUsers = async () => {
    const session = await verifySession();
    if(!session) {
        redirect('/?sign_in')
    }
    if(session.role !== 'ADMIN') {
        redirect('/')
    }
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    }).catch(handlePrismaError);

    return users;
}

export const getUser = async (id: number) => {
    const session = await verifySession();
    if(!session) {
        redirect('/?sign_in')
    }
    if(session.role !== 'ADMIN') {
        redirect('/')
    }
    return await prisma.user.findUnique({ where: { id: id }}).catch(handlePrismaError);
}

export const deleteUser = async (id: number) => {
    const session = await verifySession();
    
    if (!session) {
        redirect('/?sign_in');
    }
    
    if (session.role !== 'ADMIN') {
        redirect('/');
    }

     await prisma.user.delete({
        where: { id: id }
    }).catch(handlePrismaError);
};
