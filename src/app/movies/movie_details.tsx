'use client'

import { movie } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";
import { Dialog } from "@mui/material";

const MovieDetails = ({ movieData }: { movieData: movie | null }) => { 

    const searchParams = useSearchParams();

    const edit = searchParams.get('details');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('details');
        redirect(`/movies?${updatedParams.toString()}`);
    }
 
    return (
        <Dialog open={!!edit && !!movieData} onClose={onClose}>
            
        </Dialog>
    )
}

export default MovieDetails;