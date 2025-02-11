import MovieDetailsDialog from "./movie_details_dialog";
import React from "react";
import { getMovieDetailsWithScreenings } from "../_lib/movie/actions";

const MoviePopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const details = searchParams.get("details");
    
   const movieDetails = details ? await getMovieDetailsWithScreenings(parseInt(details)) : null;

    return (
        <React.Fragment>
            <MovieDetailsDialog details={movieDetails} />
        </React.Fragment>
    )
}

export default MoviePopups;