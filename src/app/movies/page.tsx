import { Box, Container, Paper, Typography } from "@mui/material";

import MoviesList from "./movies_list";
import React from "react";
import MoviePopups from "./movie_popups";
import SearchBar from "../_components/search_bar/search_bar";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);

  return (
    <Container maxWidth='lg' sx={{ }}>
      <MoviePopups searchParams={params}/>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', px: 3, pb: 3 }} >
        <Typography variant="h2" my={2} textAlign={"center"}>
          Movie Index
        </Typography>
        <Box sx={{ mx: 2, my: 2 }}>
          <SearchBar />
        </Box>
        <MoviesList searchParams={params}/>
      </Paper>
    </Container>
  );
}
