import { Box, Typography } from "@mui/material";

const MovieDetails = ({ details }: { details: {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string;
    description: string;
    duration: number;
} | null;
}) => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', gap: 0}}>
            <Typography variant="h3" fontWeight="bold" textAlign="center">
                {details?.title}
            </Typography>
            <Typography variant="h5" color="textSecondary" textAlign="center">
                {details?.director}
            </Typography>
            <Typography variant="h6" color="textSecondary" textAlign="center">
                {details?.year}
            </Typography>
            <Typography variant="body1" textAlign="center" gutterBottom={false}> 
                {details?.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center" gutterBottom>
                Runnning time: {details?.duration} minutes
            </Typography>
        </Box>
    )
};

export default MovieDetails;