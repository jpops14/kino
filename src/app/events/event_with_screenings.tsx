'use client'

import { Box, Paper, Typography } from "@mui/material";
import MovieScreenings from "../_components/movie/movie_screenings";

type Screening = {
    id: number;
    start: Date;
    full: boolean;
    movieTitle: string;
}

const EventWithScreenings = ({ event }: { event: {
    name: string;
    description: string;
    screenings: Screening[]
}
}) => {
    const movieScreenings = (event.screenings || []).reduce((acc: Record<string, Screening[]>, screening) => ({
            ...acc,
            [screening.movieTitle]: [
                ...(acc[screening.movieTitle] || []),
                screening
            ]
        }
    ), {});

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', gap: 0}}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    {event?.name}
                </Typography>
                <Typography variant="h5" color="textSecondary" textAlign="center">
                    {event?.description}
                </Typography>
            </Box>
            {Object.entries(movieScreenings).map(([movieTitle, movieScreenings]) => (
                <Box key={movieTitle} sx={{ my: 2, display: 'flex', alignItems: 'center', alignContent: 'center', gap: 2 }}>
                    <Typography textAlign={'center'}  variant="h4" sx={{ textWeight: 'bold', mr: 1 }}>
                        {movieTitle}
                    </Typography>
                    <MovieScreenings screenings={movieScreenings} fullDate/>
                </Box>
            ))}
        </Paper>
    )
};

export default EventWithScreenings;