import { verifySession } from "@/app/_lib/auth/session";
import { Alert, Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import BookingsList from "./bookings_list";

export default async function Page() {
  const session = await verifySession();

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pt: 2}}>
      {!session ? (
            <Alert severity="info" sx={{ width: 'lg', justifyContent: 'start', alignItems: 'center', display: 'flex', flexDirection: 'column' }}> 
              <Typography variant='h6'> You have to be signed in to view bookings </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href={`/bookings/?sign_in`}> Sign in </Button>
                <Button sx={{ my: 2, mx: 'auto' }} variant="contained" href={`/bookings/?sign_up`}> Sign up </Button>
              </Box>
            </Alert>
        ) : (
          <><Typography variant='h2' textAlign={'center'}> Bookings </Typography><BookingsList /></>
        )}
      </Paper>
    </Container>
  )
}
