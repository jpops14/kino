'use client'

import { redirect, useSearchParams } from "next/navigation";
import { Box, Dialog, Divider, Typography } from "@mui/material";
import MovieDetails from "../_components/movie/movie_details";
import MovieScreenings from "../_components/movie/movie_screenings";
import React from "react";

const MovieDetailsDialog = ({ details }: { details: {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string;
    description: string;
    duration: number;
    screenings: {
        id: number;
        start: Date;
        full: boolean;
    }[];
} | null,
}) => { 

    const searchParams = useSearchParams();


    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('details');
        redirect(`/movies?${updatedParams.toString()}`);
    }
 
    return (
        <Dialog maxWidth="lg" open={!!details} onClose={onClose}>
            <Box width={"lg"} sx={{ padding: 2 }}> 
                <MovieDetails details={details} />
                {details?.screenings?.length ? 
                <React.Fragment>
                    <Divider sx={{ my: 1 }}/>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Screenings
                    </Typography>
                    <MovieScreenings screenings={details?.screenings || []} fullDate />
                </React.Fragment>
                 : null}
            </Box>
        </Dialog>
    )
}

export default MovieDetailsDialog;