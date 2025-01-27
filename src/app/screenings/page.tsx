import { Box, Container, Paper, Typography } from "@mui/material";

import React from "react";
import DateFilter from "./date_filter";
import { getScreenings } from "../_lib/screening/actions";
import dayjs from "dayjs";
import Screenings from "./screenings";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);

  const dateParam = params.get('date');
  const datefilter = dateParam ? dayjs(dateParam).toDate() : new Date();

  const screenings = await getScreenings(datefilter);

  return (
    <Container maxWidth='lg' sx={{ }}>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', px: 3, pb: 3 }} >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h2" my={2} textAlign={"center"}>
          Screenings
        </Typography>
          <DateFilter />
        </Box>
        <Screenings screenings={screenings || []} />
      </Paper>
    </Container>
  );
}
