import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import ScreeningEditor from "./screening_editor";
import { deleteScreening, getScreening } from "@/app/_lib/screening/actions";
import { DeleteDialog } from "@/app/_components/dialogs/delete_dialog";

const ScreeningPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const screening = searchParams.get("screening");
    
    const editScreening = screening ? await getScreening(parseInt(screening)) : null;

    const movies = await prisma.movie.findMany().catch(handlePrismaError);

    const rooms = await prisma.room.findMany().catch(handlePrismaError);

    return (
        <React.Fragment>
            {screening !== null ? <ScreeningEditor rooms={rooms} movies={movies} screeningData={editScreening} /> : null}
            <DeleteDialog onDelete={deleteScreening} />
        </React.Fragment>
    )
}

export default ScreeningPopups;
