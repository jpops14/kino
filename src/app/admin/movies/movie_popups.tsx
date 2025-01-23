import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import MovieEditor from "./movie_editor";

const MoviePopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const movie = searchParams.get("movie");
    
    const editMovie = movie ? await prisma.movie.findUnique({ where: { id: parseInt(movie) } }).catch(handlePrismaError) : null;

    return (
        <React.Fragment>
            {movie !== null ? <MovieEditor movieData={editMovie} /> : null}
        </React.Fragment>
    )
}

export default MoviePopups;
