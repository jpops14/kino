'use server'

import { handlePrismaError } from "@/app/_db/utils";
import { verifySession } from "../auth/session";
import { redirect } from "next/navigation";
import { editEventSchema } from "./definitions";
import prisma from "@/app/_db/db";

export const editEvent = async (state, formData: FormData) => {
    const session = await verifySession();

    if (!session || session.role !== 'ADMIN') {
        redirect('/');
    }

    const idString = formData.get('id')?.toString();
    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const screenings = formData.getAll('screenings').map((id) => parseInt(id.valueOf() as string));

    const formValues = {
        id: idString ? parseInt(idString) : null,
        name: name || "",
        description: description || "",
        screenings: screenings,
    };

    const validationResult = editEventSchema.safeParse(formValues);

    console.log(validationResult);
    console.log(formValues)
    console.log(validationResult.error?.flatten().fieldErrors)

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        };
    }

    const { id, name: eventName, description: eventDescription, screenings: eventScreenings } = validationResult.data;

    const eventOperation = id ? prisma.event.update({
        where: { id: id },
        data: {
            name: eventName,
            description: eventDescription,
            screenings: {
                connect: eventScreenings.map((screeningId) => ({ id: screeningId })),
            },
        },
    }) : prisma.event.create({
        data: {
            name: eventName,
            description: eventDescription,
            screenings: {
                connect: eventScreenings.map((screeningId) => ({ id: screeningId })),
            }
        },
    });

    const event = await eventOperation.then(
        (event) => {
            console.debug(`event #${event.id} ${id ? 'updated' : 'created'}`);
            console.debug(`^ event: ${JSON.stringify(event)}`);
            return event;
        }
    ).catch(
        handlePrismaError
    );

    if (event) {
        return {
            success: true,
        };
    } else {
        return {
            errors: {
                general: 'An error occurred while saving changes',
            },
        };
    }
};

export const getEventsWithScreenings = async (limit?: number) => prisma.event.findMany({
    select: {
        id: true,
        name: true,
        description: true,
        screenings: {
            where: {
                start: {
                    gte: new Date(),
                }
            },
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
                        capacity: true,
                    }
                },
                bookings: {
                    where: { 
                        OR: [
                            { payment_expires: { gte: new Date() } },
                            { paid: { equals: true } }
                        ]
                    },
                    select: {
                        id: true,
                        seats_count: true,
                    }
                },

            }
        }
    },
    take: limit ? limit : undefined,
})
.then((events) => events.map((event) => ({
        id: event.id,
        name: event.name,
        description: event.description,
        screenings: event.screenings.map((screening) => ({
            id: screening.id,
            movieTitle: screening.movie.title,
            start: screening.start,
            full: screening.bookings.reduce((acc, booking) => acc + booking.seats_count, 0) >= screening.room.capacity,
        })),
})).filter((event) => event.screenings.length > 0))
.catch(handlePrismaError);

export const deleteEvent = async (id: number) => {
    const session = await verifySession();

    if (!session) {
        redirect('/?sign_in');
    }

    if (session.role !== 'ADMIN') {
        redirect('/');
    }

    await prisma.event.delete({
        where: { id: id }
    }).catch(handlePrismaError);
};