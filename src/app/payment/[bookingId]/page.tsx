import { Alert, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { getBookingData } from "@/app/_lib/booking/actions";
import { verifySession } from "@/app/_lib/auth/session";
import Payment from "./payment";
import { redirect } from "next/navigation";

export default async function Page({ params }: { searchParams: Promise<Record<string, string>>, params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const session = await verifySession();
  const booking = await getBookingData(bookingId);
  if (!session) {
    redirect('/bookings');
  }

  return (
    <Container maxWidth="md">
        <Paper>
        {!booking ? (
            <Alert severity="error" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}> 
                <Typography variant='h6'> Could not find booking </Typography>
                <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href="/bookings"> Return to bookings </Button>
            </Alert>
        ) :  <Payment bookingData={booking}/>}
        </Paper>
    </Container>
  )
}
