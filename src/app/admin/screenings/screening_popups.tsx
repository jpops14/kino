import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import ScreeningEditor from "./create/screening_editor";

const ScreeningPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const screening = searchParams.get("screening");
    
    const editScreening = screening ? await prisma.screening.findUnique({ where: { id: parseInt(screening) } }).catch(handlePrismaError) : null;

    const movies = await prisma.movie.findMany().catch(handlePrismaError);

    const rooms = await prisma.room.findMany().catch(handlePrismaError);

    return (
        <React.Fragment>
            {screening !== null ? <ScreeningEditor rooms={rooms} movies={movies} screeningData={editScreening} /> : null}
        </React.Fragment>
    )
}

export default ScreeningPopups;
