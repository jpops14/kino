'use client'

import { Paper, Box, Typography, Button } from "@mui/material";
import { movie } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";

const MovieCard = ({ movieData }: { movieData: movie }) => {
    const searchParams = useSearchParams();

    const handleDetails = (id: number) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("details", id.toString());
        redirect(`/movies?${updatedParams.toString()}`);
    }

    const handleEdit = (id: number) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("edit", id.toString());
        redirect(`/movies?${updatedParams.toString()}`);
    }
    return (<Paper>
    <Box sx={{ m: 3}}>
        <Box>
        <Typography variant="h5">
        {movieData.year} {movieData.director}
        </Typography>
        <Typography variant="h4">
        {movieData.title}
        </Typography>
        <Typography variant="h5">
        {movieData.genre}
        </Typography>
        </Box>
        <Button onClick={() => handleEdit(movieData.id)}>
            Edit
        </Button>
        <Button onClick={() => handleDetails(movieData.id)}>
            Details
        </Button>
    </Box>
</Paper>)
}

export default MovieCard;