import { Card, CardContent, Typography, Grid, Alert, Box } from "@mui/material";
import { getUserBookings } from "../_lib/booking/actions";

const BookingsList = async ({ limit }: {limit?: number }) => {
    const bookings = await getUserBookings(limit);
    return (
        <Grid container spacing={2} p={2}>
            {bookings?.length ? bookings.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                    <Card sx={{ borderRadius: 2, overflow: 'hidden', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' }, boxShadow: 3 }}>
                        <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: booking.expired ? 'grey.300' : 'background.paper' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography fontWeight="bold" variant="h4" color="primary">{booking.title}</Typography>
                                <Typography fontWeight="medium" variant="h6" color="textSecondary">{new Date(booking.start).toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <Typography fontWeight="medium" variant="h6" color="textSecondary">Seats: {booking.seats.join(', ')}</Typography>
                                <Typography fontWeight="medium" variant="h6" color="textSecondary">{booking.room}</Typography>
                                {booking.roomInfo && (
                                    <Typography fontWeight="medium" variant="body2" color="textSecondary">{booking.roomInfo}</Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            )) : (
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}> 
                        <Typography variant='h6'> No bookings found </Typography>
                    </Alert>
                </Grid>
            )}
        </Grid>
    );
};

export default BookingsList;