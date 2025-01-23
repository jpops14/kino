'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { editScreeningSchema } from "./definitons";
import dayjs from "dayjs";
import { verifySession } from "../auth/session";
import { redirect } from "next/navigation";

export const editScreening = async (state, formData: FormData) => {
    const session = await verifySession();

    if (!session || session.role !== 'ADMIN') {
        redirect('/');
    }

    const idString = formData.get('id')?.toString();
    const movieIdString = formData.get('movie_id')?.toString();
    const roomIdString = formData.get('room_id')?.toString();
    const priceString = formData.get('price')?.toString();
    const startString = formData.get('start')?.toString();


    console.log(Object.fromEntries(formData.entries()));

    const formValues = {
        id: idString ? parseInt(idString) : null,
        start: startString ? new Date(startString) : null,
        movie_id: movieIdString ? parseInt(movieIdString) : null,
        room_id: roomIdString ? parseInt(roomIdString) : null,
        price: priceString ? parseFloat(priceString) : null,
    }

    const validationResult = editScreeningSchema.safeParse(formValues);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { id, start, movie_id, room_id, price } = validationResult.data;

    const screeningOperation = id ? prisma.screening.update({
        where: { id: id },
        data: {
            start: start,
            movie_id: movie_id,
            room_id: room_id,
        }
    }) : prisma.screening.create({
        data: {
            start: start,
            movie_id: movie_id,
            room_id: room_id,
            price: price,
        }
    });
    
    const screening = await screeningOperation.then(
        (screening) => { 
            console.debug(`screening #${screening.id} ${id ? 'updated' : 'created'}`)
            console.debug(`^ screening: ${JSON.stringify(screening)}`)
            return screening;
        }
    ).catch(
        handlePrismaError
    );

    if (screening) {
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

export const getRoomScreeningsAndCapacity = async (roomId: number, date: Date) => {
    const session = await verifySession();

    if (!session || session.role !== 'ADMIN') {
        redirect('/');
    }

    return await prisma.screening.findMany({
        where: {
            id: roomId,
            start: {
                gte: dayjs(date).startOf('day').toDate(),
                lt: dayjs(date).endOf('day').add(4, 'h').toDate(),
            }
        },
        select: {
            start: true,
            movie: {
                select: {
                    duration: true,
                }
            },
            room: {
                select: {
                    capacity: true,
                }
            }
        }
    }).then((screenings) => screenings.map((screening) =>
                ({
                    start: screening.start,
                    end: dayjs(screening.start).add(screening.movie.duration, 'minutes').toDate(),
                })
    )).catch(handlePrismaError);
}
