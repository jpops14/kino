'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { editScreeningSchema } from "./definitons";
import dayjs, { Dayjs } from "dayjs";
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

export const getBookingScreeningData = async (screeningId: string) => {

    const session = await verifySession();

    if (!session) {
        return null;
    }

    await prisma.booking.deleteMany({
        where: {
            paid: false,
            payment_expires: {
                lte: new Date()
            }
        }
    }).catch(handlePrismaError);


    try {
        const parsedId = parseInt(screeningId);
        return await prisma.screening.findFirst({
            where: {
                id: parsedId,
            },
            select: {
                id: true,
                start: true,
                price: true,
                movie: {
                    select: {
                        id: true,
                        title: true,
                        year: true,
                        director: true,
                        genre: true,
                        description: true,
                        duration: true,
                    }
                },
                room: {
                    select: {
                        name: true,
                        information: true,
                        layout: true
                    }
                },
                bookings: {
                    select: {
                        seats: true
                    }
                }
            }
        })
        .catch(handlePrismaError)
        .then((screening) => {
            if (!screening) {
                redirect('/');
            }
            return {
                id: screening.id,
                start: screening.start,
                room: screening.room,
                price: Number(screening.price),
                movie: screening.movie,
                lockedSeats: new Set(screening.bookings.map((booking) => JSON.parse(booking.seats)).flat())
            };
        }).catch((e) => null);
    } catch (e) {
        redirect('/');
    }
}

export const getScreenings = async (date: Date) => prisma.screening.findMany({
    where:{
            AND: [
                
                {
                    start: {
                        gte: dayjs(date).startOf('day').toDate(),
                        lt: dayjs(date).endOf('day').toDate(),
                    }
                },
                {
                    start: {
                        gte:  new Date(),
                    }
                }
            ],
    },
    select: {
        id: true,
        start: true,
        movie: {
            select: {
                title: true,
                id: true,
            }
        },
        bookings: {
            select: {
                seats_count: true,
            }
        },
        room: {
            select: {
                capacity: true,
            }
        }
    }}).then((screenings) => screenings.map(
    (screening) => ({
        id: screening.id,
        start: screening.start,
        movieId: screening.movie.id,
        movieTitle: screening.movie.title,
        full: screening.bookings.reduce((acc, booking) => acc + booking.seats_count, 0) >= screening.room.capacity,
    })
)).catch(handlePrismaError);

export const getAdminScreenings = async () => { 
    const session = await verifySession();
    if (!session) { 
        redirect('/?sign_in');
    }
    if (session.role !== 'ADMIN') {
        redirect('/');
    }

    return prisma.screening.findMany({
        select: {
            id: true,
            start: true,
            movie: {
                select: {
                    title: true,
                }
            },
            room: {
                select: {
                    name: true,
                }
            },
            price: true,
        }
    }).then((screenings) =>  screenings.map((screening) => ({
        ...screening,
        movieTitle: screening.movie.title,
        roomName: screening.room.name,
        price: Number(screening.price),
    }))).catch(handlePrismaError);
}

export const getScreening = async (id: number) => {
    const session = await verifySession();
    if (!session) {
        redirect('/?sign_in');
    }
    if (session.role !== 'ADMIN') {
        redirect('/');
    }
    return prisma.screening.findFirst({
        where: {
            id: id,
        }
    }).then((screening) => ({
        ...screening,
        price: Number(screening.price),
    })).catch(handlePrismaError);
}

export const deleteScreening = async (id: number) => {
    const session = await verifySession();

    if (!session) {
        redirect('/?sign_in');
    }

    if (session.role !== 'ADMIN') {
        redirect('/');
    }

    await prisma.screening.delete({
        where: { id: id }
    }).catch(handlePrismaError);
};