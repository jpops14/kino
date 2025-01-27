import { Box, Button } from "@mui/material";
import dayjs from "dayjs";

const MovieScreenings = ({ screenings, fullDate }: {
        screenings: {
            id: number;
            start: Date;
            full: boolean;
        }[] | null,
        fullDate?: boolean;
}) => (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', gap: 2 }}>
        {screenings?.map(screening => (
            <Button 
                key={screening.id} 
                variant="contained" 
                color={screening.full ? 'primary' : "success"}
                disabled={screening.full}
                href={`/bookings/${screening.id}`}
            >
                {dayjs(screening.start).format(fullDate ? 'YYYY-MM-DD HH:mm' : 'HH:mm')}
            </Button>
        ))}
    </Box>
);

export default MovieScreenings;