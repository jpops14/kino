import { Container, Paper, Typography } from "@mui/material";

import { getEventsWithScreenings } from "../_lib/event/actions";
import EventWithScreenings from "./event_with_screenings";

export default async function Page({ }: { searchParams: Promise<Record<string, string>> }) {
  const events = await getEventsWithScreenings()

  return (
    <Container maxWidth='lg' sx={{ }}>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', px: 2, pb: 2, gap: 2 }} >
        <Typography variant="h2" my={2} textAlign={"center"}>
          Events
        </Typography>
        {(events || []).map((event) => (
          <EventWithScreenings key={event.id} event={event} />
        ))}
      </Paper>
    </Container>
  );
}
