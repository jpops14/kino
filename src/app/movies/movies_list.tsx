import { Grid } from "@mui/material";
import { getMovies } from "../_lib/movie/actions";
import MovieCard from "./movie_card";

const MoviesList = async ({ searchParams, limit }: { searchParams: URLSearchParams, limit?: number }) => {

  const params = await searchParams
  const search = params.get('search')
  const movies = await getMovies(search, limit);

  return (
    <Grid container spacing={2} p={2} justifyContent='center'>
    {movies?.map((movie) => (
        <Grid item xs={4} key={movie.id}>
          <MovieCard movieData={movie}/>
        </Grid>
    ))}
    </Grid>);
}

export default MoviesList;
  