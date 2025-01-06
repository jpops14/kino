'use client'

import { movie } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";
import { Dialog } from "@mui/material";
import MovieForm from "./movie_form";

const MovieEditor = ({ movieData }: { movieData: movie | null}) => { 

    const searchParams = useSearchParams();

    const edit = searchParams.get('edit');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('edit');
        redirect(`/movies?${updatedParams.toString()}`);
    }
 
    return ( 
        <Dialog open={edit !== null} onClose={onClose}>
            <MovieForm initialValues={movieData}/>
        </Dialog>
    )
}

export default MovieEditor;