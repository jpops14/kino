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

    return (
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ height: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    <Typography fontWeight="bold" textAlign="center" variant="h4" color="primary">
                        {movieData.title}
                    </Typography>
                    <Typography fontWeight={'medium'} textAlign="center" variant="h5" color="textSecondary">
                        {movieData.year}
                    </Typography>
                    <Typography textAlign="center" variant="h6" color="textSecondary">
                        {movieData.director}
                    </Typography>
                </Box>
                <Button variant='contained' color='primary' onClick={() => handleDetails(movieData.id)} sx={{ mt: 2 }}>
                    Details & Screenings
                </Button>
            </Box>
        </Paper>
    )
}

export default MovieCard;