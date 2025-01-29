'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { NewsSchema } from "./definitons";
import { redirect } from "next/navigation";
import { verifySession } from "../auth/session";

export const editNews = async (state, formData: FormData) => {

    const session = await verifySession();

    if (!session) {
        redirect('/news?sign_in');
    };

    if(session?.role !== 'ADMIN') {
        redirect('/news');
    }

    const idString = formData.get('id')?.toString();
    const publicationString = formData.get('publication')?.toString();

    const formValues = {
        id: idString ? parseInt(idString) : null,
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        content: formData.get('content'),
        publication: publicationString ? new Date(publicationString) : null,
    }

    const validationResult = NewsSchema.safeParse(formValues);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { id, title, subtitle, content, publication } = validationResult.data;

    const newsOperation = id ? prisma.news.update({
        where: { id: id },
        data: {
            id: id,
            title: title,
            subtitle: subtitle,
            content: content,
            publication: publication,
        }
    }) : prisma.news.create({
        data: {
            title: title,
            subtitle: subtitle,
            content: content,
            publication: publication,
        }
    });
    
    const news = await newsOperation.then(
        (news) => { 
            console.debug(`news #${news.id} ${id ? 'updated' : 'created'}`)
            console.debug(`^ news: ${JSON.stringify(news)}`)
            return news;
        }
    ).catch(
        handlePrismaError
    );

    if (news) {
        return {
            success: true
        }
    } else {
        return {
            errors: {
                general: 'An error occurred while saving changes'
            }
        }
    }
}

export const getNews = async (limit?: number) => prisma.news.findMany({
    where: { publication: { lte: new Date() } },
    orderBy: { publication: 'desc' },
    take: limit,
}).catch(handlePrismaError)

export const deleteNews = async (id: number) => {
    const session = await verifySession();

    if (!session) {
        redirect('/sign_in');
    }

    if (session.role !== 'ADMIN') {
        redirect('/');
    }

    return await prisma.news.delete({
        where: { id: id }
    }).catch(handlePrismaError);
};