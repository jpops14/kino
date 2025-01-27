'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { MovieSchema } from "./definitons";
import { redirect } from "next/navigation";
import { errors } from "jose";
import { verify } from "crypto";
import { verifySession } from "../auth/session";
import { start } from "repl";

export const editMovie = async (state, formData: FormData) => {

    const session = await verifySession();

    if (!session) {
        redirect('/movies?sign_in');
    };

    if(session?.role !== 'ADMIN') {
        redirect('/movies');
    }

    const idString = formData.get('id')?.toString();
    const durationString = formData.get('duration')?.toString();
    const yearString = formData.get('year')?.toString();

    const formValues = {
        id: idString ? parseInt(idString) : null,
        title: formData.get('title'),
        year: yearString ? parseInt(yearString) : null,
        director: formData.get('director'),
        genre: formData.get('genre'),
        description: formData.get('description'),
        duration: durationString ? parseInt(durationString) : null,
        tmdb_id: formData.get('tmdb_id'),
        imdb_id: formData.get('imdb_id'),
    }

    const validationResult = MovieSchema.safeParse(formValues);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { id, title, year, director, genre, description, duration, _tmdb_id, _imdb_id } = validationResult.data;

    const movieOperation = id ? prisma.movie.update({
        where: { id: id },
        data: {
            id: id,
            title: title,
            year: year,
            director: director,
            genre: genre,
            description: description,
            duration: duration,
        }
    }) : prisma.movie.create({
        data: {
            title: title,
            year: year,
            director: director,
            genre: genre,
            description: description,
            duration: duration,
        }
    });
    
    const movie = await movieOperation.then(
        (movie) => { 
            console.debug(`movie #${movie.id} ${id ? 'updated' : 'created'}`)
            console.debug(`^ movie: ${JSON.stringify(movie)}`)
            return movie;
        }
    ).catch(
        handlePrismaError
    );

    if (movie) {
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

export const getMovies = async (search: string | null, limit?: number ) => prisma.movie.findMany(search ? {
    where: {
        OR: [
            { title: { contains: search } },
            { director: { contains: search } },
            { genre: { contains: search } },
            { description: { contains: search } },
        ]
    },
    select: {
        id: true,
        title: true,
        year: true,
        director: true,
        genre: true,
    },
    take: limit || 3,
}: undefined).catch(handlePrismaError);

export const getMovieDetailsWithScreenings = async (id: number) => prisma.movie.findUnique({
    where: { id: id },
    select: {
        id: true,
        title: true,
        year: true,
        director: true,
        genre: true,
        description: true,
        duration: true,
        screenings: {
            select: {
                id: true,
                start: true,
                room: {
                    select: {
                        name: true,
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
                }
            }
        }
    }
}).then((movie) => movie ? ({
    ...movie,
    screenings: movie.screenings.map((screening) => ({
        id: screening.id,
        start: screening.start,
        full: screening.bookings.reduce((acc, booking) => acc + booking.seats_count, 0) >= screening.room.capacity,
    }))
}) : null).catch(handlePrismaError);