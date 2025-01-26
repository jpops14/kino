import { Box, Container, Paper, Typography } from "@mui/material";
import prisma from "../_db/db";

import { handlePrismaError } from "../_db/utils";
import MoviesList from "./movies_list";
import { movie } from "@prisma/client";
import React from "react";
import MoviePopups from "./movie_popups";
import { redirect } from "next/navigation";
import SearchBar from "../_components/search_bar/search_bar";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);

  return (
    <Container maxWidth='lg'>
      <MoviePopups searchParams={params}/>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pt: 2}} >
      <Typography variant="h2" my={2} textAlign={"center"}>
          Movie Index
      </Typography>
      <Box sx={{ mx: 2 }}>
        <SearchBar />
      </Box>
      <MoviesList searchParams={params}/>
      </Paper>
    </Container>
  );
}
