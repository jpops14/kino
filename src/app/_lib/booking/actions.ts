'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { redirect } from "next/navigation";
import { verifySession } from "../auth/session";

export const createBookingAction = async (state: { error?: string, updatedLockedSeats?: Set<string> } = {}, data: { screeningId: number, total: number, selectedSeats: Set<string> }) => {

    const session = await verifySession();

    if (!session) {
        redirect('/?sign_in');
    }

    await prisma.booking.deleteMany({
        where: {
            paid: false,
            payment_expires: {
                lte: new Date()
            }
        }
    }).catch(handlePrismaError);

    const screningBookings = await prisma.booking.findMany({
        where: {
            screening_id: data.screeningId,
        },
        select: {
            seats: true,
        }
    }).catch(handlePrismaError) || [];

    const lockedSeats = new Set(screningBookings.map((booking) => JSON.parse(booking.seats) as string[]).flat());

    const conflict = Array.from(data.selectedSeats).filter(seat => lockedSeats.has(seat));

    if (conflict.length) {
        return {
            error: `Seats ${conflict.join(', ')} have been booked by someone else`,
            updatedLockedSeats: lockedSeats,
        }
    }

    const seats = Array.from(data.selectedSeats);

    if (!seats?.length) {
        return {
            error: 'Please select at least one seat',
        }
    }

    const booking = await prisma.booking.create({
        data: {
            total: 20,
            seats: JSON.stringify(seats),
            seats_count: seats.length,
            payment_expires: new Date(Date.now() + 5 * 60 * 1000),
            user: {
                connect: {
                    id: session.id,
                }
            },
            screening: {
                connect:
                {
                    id: data.screeningId,
                }
            }

        }
    }).catch(handlePrismaError);

    if (!booking) {
        return {
            error: `Could not create booking, please try again`,
        }
    }

    if (booking) {
        redirect(`/payment/${booking.id}`);
    }
};

export const getBookingData = async (bookingId: string) => {
    const session = await verifySession();

    if (!session) {
        redirect('/');
    }

    const parsedBookindId = parseInt(bookingId);

    const booking = await prisma.booking.findUnique({
        where: {
            id: parsedBookindId,
        },
        select: {
            id: true,
            payment_expires: true,
            total: true,
            user_id: true,
            seats_count: true,
            paid: true,
            screening: {
                select: {
                    id: true,
                    start: true,
                    movie: {
                        select: {
                            title: true,
                        }
                    }
                }
            }
        }
    }).then((booking) => ({
        ...booking,
        total: Number(booking?.total || 0),
    })).catch(handlePrismaError);

    if (!session || !booking || booking.user_id !== session.id) {
        redirect('/');
    }

    return booking;
}

export const confirmBookingPayment = async (bookingId: number, transactionId: string) => {
    const session = await verifySession();

    if (!session) {
        redirect('/');
    }

    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
        select: {
            id: true,
            payment_expires: true,
            paid: true,
            user_id: true,
            seats_count: true,
        }
    }).catch(handlePrismaError);

    if (!booking) {
        return {
            error: 'Booking not found',
        }
    }

    if (booking.user_id !== session.id) {
        return {
            error: 'You are not authorized to view this booking',
        }
    }

    if (booking.paid) {
        return {
            error: 'Booking has already been paid for',
        }
    }

    if (booking.payment_expires < new Date()) {
        return {
            error: 'Payment has expired',
        }
    }

    await prisma.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            paid: true,
            transaction_id: transactionId,
        }
    }).catch(handlePrismaError);

    if (booking) {
        redirect(`/bookings`);
    }

    return {
        error: 'Could not confirm payment',
    }
};

export const getUserBookings = async () => {
    const session = await verifySession();

    if (!session) {
        return null;
    }

    return await prisma.booking.findMany({
        where: {
            user_id: session.id,
            paid: true,
        },
        select: {
            id: true,
            paid: true,
            seats_count: true,
            seats: true,
            screening: {
                select: {
                    start: true,
                    movie: {
                        select: {
                            title: true,
                        }
                    },
                    room: {
                        select: {
                            name: true,
                            information: true
                        }
                    }
                }
            }
        },
        orderBy: {
            screening: {
                start: 'desc'
            }
        }})
        .then((bookings) => bookings.map((booking) => (
            {
                id: booking.id,
                seats: JSON.parse(booking.seats) as string[],
                paid: booking.paid,
                seats_count: booking.seats_count,
                start: booking.screening.start,
                title: booking.screening.movie.title,
                room: booking.screening.room.name,
                roomInfo: booking.screening.room.information,
                expired: ((new Date()) > booking.screening.start),
            }
        )))
        .catch(handlePrismaError);
}
