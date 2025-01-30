import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import EventEditor from "./event_editor";
import { DeleteDialog } from "@/app/_components/dialogs/delete_dialog";
import { deleteEvent } from "@/app/_lib/event/actions";

const EventPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const event = searchParams.get("event");

    const editEvent = event ? await prisma.event.findUnique({ where: { id: parseInt(event) }, select: {
        id: true,
        name: true,
        description: true,
        screenings: { select: { id: true } }
    }}).catch(handlePrismaError) : null;

    const screenings = await prisma.screening.findMany({
        where: {
            start: { gte: new Date() }
        },
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
    }).catch(handlePrismaError) || [];

    return (
        <React.Fragment>
            {event !== null ? <EventEditor screenings={screenings} eventData={editEvent} /> : null}
            <DeleteDialog onDelete={deleteEvent} />
        </React.Fragment>
    )
}

export default EventPopups;