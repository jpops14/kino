import { Box, Container, Typography } from "@mui/material";
import prisma from "../_db/db";

import { handlePrismaError } from "../_db/utils";
import Movies from "./movies";
import { movie } from "@prisma/client";
import React from "react";
import MoviePopups from "./movie_popups";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  

  

  return (
    <Container>
      <MoviePopups searchParams={params}/>
      <Movies searchParams={params}/>
    </Container>
  );
}
