import { Typography, Box, Paper, Grid, Button } from "@mui/material";
import { movie } from "@prisma/client";
import { redirect } from "next/navigation";
import MovieCard from "./movie_card";
import prisma from "../_db/db";

const Movies = async ({ searchParams }: {searchParams: URLSearchParams}) => {

  const movies = await prisma.movie.findMany();

    const _movies: movie[] = [
      {
        id: 1,
        title: "The Shawshank Redemption",
        description: "The classic prison escape movie",
        year: 2022,
        director: "Frank Darabont",
        genre: "Drama",
        tmdb_id: null,
        imdb_id: null,
        duration: 14,
      },
      {
        id: 2,
        title: "The Godfather",
        description: "The classic mafia movie",
        year: 2022,
        director: "Francis Ford Coppola",
        genre: "Drama",
        tmdb_id: null,
        imdb_id: null,
        duration: 290
      },
      {
        id: 3,
        title: "The Dark Knight",
        description: "The classic superhero movie",
        year: 2022,
        director: "Christopher Nolan",
        genre: "Action",
        tmdb_id: null,
        imdb_id: null,
        duration: 30
      },
      {
        id: 4,
        title: "The Shawshank Redemption",
        description: "The classic prison escape movie",
        year: 2022,
        director: "Frank Darabont",
        genre: "Drama",
        tmdb_id: null,
        imdb_id: null,
        duration: 45
      },
      {
        id: 5,
        title: "The Godfather",
        description: "The classic mafia movie",
        year: 2022,
        director: "Francis Ford Coppola",
        genre: "Drama",
        tmdb_id: null,
        imdb_id: null,
        duration: 2137
      },
      {
        id: 6,
        title: "The Dark Knight",
        description: "The classic superhero movie",
        year: 2022,
        director: "Christopher Nolan",
        genre: "Action",
        tmdb_id: null,
        imdb_id: null,
        duration: 75
      },
    ];

    return (
      <Paper sx={{p: 2}}>
        <Grid container spacing={1}>
        {movies?.map((movie) => (
            <Grid item key={movie.id} xs={12} sx={{ }}>
              <MovieCard movieData={movie}/>
            </Grid>
        ))}
        </Grid>
      </Paper>
    );
  }

export default Movies;
  