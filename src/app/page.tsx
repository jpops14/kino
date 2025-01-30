import { Button, Container, Paper, Typography } from "@mui/material";
import { verifySession } from "./_lib/auth/session";
import BookingsList from "./bookings/bookings_list";
import MoviesList from "./movies/movies_list";
import NewsList from "./news/news_list";

export default async function Page() {
  const session = await verifySession();

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant='h2' textAlign={'center'} fontWeight='bold' mb={2}> Dashboard </Typography>
        {session && 
        <Paper elevation={2} sx={ { p: 2, my: 1 } }>
          <Typography variant='h4' textAlign={'center'} fontWeight='medium'> Your active bookings </Typography>
          <BookingsList limit={3}/>
          <Button href="/bookings" sx={{mx: 'auto'}}>
              <Typography variant='button'>
                See all your active bookings  
              </Typography> 
           </Button>
        </Paper>}
        <Paper elevation={2} sx={ { p: 2, my: 2 } }>
          <Typography variant='h4' textAlign={'center'} fontWeight='medium'> Latest news </Typography>
          <NewsList limit={3}/>
          <Button href="/news" > 
              <Typography variant='button'>
                See all movies  
              </Typography> 
          </Button>
        </Paper>
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
