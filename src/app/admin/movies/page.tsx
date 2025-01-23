import { Container } from "@mui/material";;
import React from "react";
import Movies from "./movies";
import MoviePopups from "./movie_popups";
import { handlePrismaError } from "@/app/_db/utils";
import prisma from "@/app/_db/db";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const movies = await prisma.movie.findMany().catch(handlePrismaError);

  return (
    <Container>
      <MoviePopups searchParams={params}/>
      <Movies movies={movies} searchParams={params}/>
    </Container>
  );
}
