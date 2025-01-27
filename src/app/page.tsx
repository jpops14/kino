import { Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { getUserBookings } from "@/app/_lib/booking/actions";
import BookingsList from "./bookings/bookings_list";
import { verifySession } from "./_lib/auth/session";
import MoviesList from "./movies/movies_list";

export default async function Page() {
  const userBookings = await getUserBookings();
  const session = await verifySession();

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant='h2' textAlign={'center'} fontWeight='bold' mb={2}> Dashboard </Typography>
        {session && 
        <Paper elevation={2} sx={ { p: 2, my: 1 } }>
          <Typography variant='h4' textAlign={'center'} fontWeight='medium'> Your active bookings </Typography>
          <BookingsList bookings={userBookings || []} limit={3}/>
          <Button href="/bookings" sx={{mx: 'auto'}}>
              <Typography variant='button'>
                See all movies  
              </Typography> 
           </Button>
        </Paper>}
        <Paper elevation={2} sx={ { p: 2, my: 2 } }>
          <Typography variant='h4' textAlign={'center'} fontWeight='medium'> New movies </Typography>
          <MoviesList searchParams={new URLSearchParams()} limit={3}/>
          <Button href="/movies" > 
              <Typography variant='button'>
                See all movies  
              </Typography> 
          </Button>
        </Paper>
      </Paper>
    </Container>
  )
}
