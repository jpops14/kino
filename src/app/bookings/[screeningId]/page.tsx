import { verifySession } from "@/app/_lib/auth/session";
import { Alert, Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import SeatPicker from "./seat_picker";
import { getBookingScreeningData } from "@/app/_lib/screening/actions";
import MovieDetails from "@/app/_components/movie/movie_details";

export default async function Page({ searchParams, params }: { searchParams: Promise<Record<string, string>>, params: Promise<{ screeningId: string }> }) {
  const { screeningId } = await params;
  const session = await verifySession();
  const screeningData = await getBookingScreeningData(screeningId);

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ height: '100vh', p: 2 }}>
      {!session ? (
            <Alert severity="info" sx={{ width: 'lg', my: 'auto', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}> 
              <Typography variant='h6'> You have to be signed in to book tickets </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href={`/bookings/${screeningId}?sign_in`}> Sign in </Button>
                <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href={`/bookings/${screeningId}?sign_up`}> Sign up </Button>
              </Box>
            </Alert>
        ) : (
          screeningData ? (
          <React.Fragment>
            <MovieDetails details={screeningData.movie} />
            <Divider sx={{ my: 1 }} />
            <SeatPicker screeningData={screeningData} />
          </React.Fragment>
          ) : (
            <Alert severity="error" sx={{ width: 'lg'}}>
              <Typography > An error occurred while loading the screening data </Typography>
            </Alert>
          )
        )}
      </Paper>
    </Container>
  )
}
