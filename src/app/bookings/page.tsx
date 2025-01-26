import { verifySession } from "@/app/_lib/auth/session";
import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { getUserBookings } from "@/app/_lib/booking/actions";
import BookingsList from "./bookings_list";

export default async function Page() {
  const session = await verifySession();
  const userBookings = await getUserBookings();

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pt: 2}}>
        <Typography variant='h2' textAlign={'center'}> Bookings </Typography>
        <BookingsList bookings={userBookings} />
      </Paper>
    </Container>
  )
}
