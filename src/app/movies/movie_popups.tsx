import prisma from "@/app/_db/db";
import { handlePrismaError } from "../_db/utils";
import MovieDetails from "./movie_details";
import React from "react";

const MoviePopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const edit = searchParams.get("edit");
    const details = searchParams.get("details");
    
   const editMovie = edit ? await prisma.movie.findUnique({ where: { id: parseInt(edit) } }).catch(handlePrismaError) : null;
   const detailsMovie = details ? await prisma.movie.findUnique({ where: { id: parseInt(details) } }).catch(handlePrismaError) : null;

    return (
        <React.Fragment>
            <MovieDetails movieData={detailsMovie} />
        </React.Fragment>
    )
}

export default MoviePopups;