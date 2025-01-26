import { SignInDialog } from "@/app/(auth)/sign_in_dialog";
import { verifySession } from "@/app/_lib/auth/session";
import { Alert, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import SeatPicker from "./seat_picker";
import { getBookingScreeningData } from "@/app/_lib/screening/actions";
import MovieDetails from "@/app/_components/movie/movie_details";

export default async function Page({ searchParams, params }: { searchParams: Promise<Record<string, string>>, params: Promise<{ screeningId: string }> }) {
  const { screeningId } = await params;
  const session = await verifySession();
  const screeningData = await getBookingScreeningData(screeningId);

  return (
    <Container maxWidth={false}>
      <Paper sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100vh'}}>
      {true ? (
          <Alert severity="error" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}> 
            <Typography variant='h6'> You have to be signed in to book tickets </Typography>
            <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href={`/bookings/${screeningId}?sign_in`}> Sign in </Button>
            <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href={`/bookings/${screeningId}?sign_up`}> Sign up </Button>
          </Alert>
        ) : (
          screeningData ? (
          <React.Fragment>
            <MovieDetails movieData={screeningData.movie} />
            <SeatPicker screeningData={screeningData} />
          </React.Fragment>
          ) : (
            <Alert severity="error">
              <Typography > An error occurred while loading the screening data </Typography>
            </Alert>
          )
        )}
      </Paper>
    </Container>
  )
}
