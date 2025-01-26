'use client'

import { movie } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";
import { Dialog, Typography } from "@mui/material";
import MovieDetails from "../_components/movie/movie_details";

const MovieDetailsDialog = ({ movieData }: { movieData: movie | null }) => { 

    const searchParams = useSearchParams();

    const edit = searchParams.get('details');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('details');
        redirect(`/movies?${updatedParams.toString()}`);
    }
 
    return (
        <Dialog open={!!edit && !!movieData} onClose={onClose}>
            <MovieDetails />
            <Typography> Screenings </Typography>
        </Dialog>
    )
}

export default MovieDetailsDialog;