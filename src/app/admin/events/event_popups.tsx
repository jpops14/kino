import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import EventEditor from "./event_editor";

const EventPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const event = searchParams.get("event");

    console.log(event);

    const editEvent = event ? await prisma.event.findUnique({ where: { id: parseInt(event) }, select: {
        id: true,
        name: true,
        description: true,
        screenings: { select: { id: true } }
    }}).catch(handlePrismaError) : null;

    const screenings = await prisma.screening.findMany({
        select: {
            start: true,
            id: true,
            room: { select: { name: true } },
            movie: { select: { title: true } }
        }
    }).then((screenings) => {
        return screenings.map((screening) => ({
            id: screening.id,
            movieTitle: screening.movie.title,
            roomName: screening.room.name,
            start: screening.start,
        }));
    }).catch((error) => {
        return [];
    });

    console.log(screenings);

    return (
        <React.Fragment>
            {event !== null ? <EventEditor screenings={screenings} eventData={editEvent} /> : null}
        </React.Fragment>
    )
}

export default EventPopups;