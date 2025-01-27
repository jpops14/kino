'use client'

import { Box, Paper, Typography } from "@mui/material";
import MovieScreenings from "../_components/movie/movie_screenings";

type Screening = {
    id: number;
    start: Date;
    movieId: number;
    movieTitle: string;
    full: boolean;
}

const Screenings = ({ screenings }: { screenings: Screening[] }) => {
    const movieScreenings = screenings.reduce((acc: Record<string, Screening[]>, screening: Screening) => ({
            ...acc,
            [screening.movieTitle]: [
                ...(acc[screening.movieTitle] || []),
                screening
            ]
        }
    ), {});

    return (
        <Box>
            {Object.entries(movieScreenings).map(([movieTitle, screenings]) => (
                <Paper key={movieTitle} sx={{ p: 2, my: 2 }}>
                    <Typography textAlign={'center'}  variant="h4" sx={{ textWeight: 'bold', mb: 2}}>
                        {movieTitle}
                    </Typography>
                    <MovieScreenings screenings={screenings} />
                </Paper>
            ))}
        </Box>
    )
};

export default Screenings;