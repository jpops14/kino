import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { getNews } from "@/app/_lib/news/actions";
import NewsList from "./news_list";

export default async function Page() {
  const news = await getNews(10);

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pt: 2}}>
          <Typography variant='h2' textAlign={'center'}> News </Typography>
          <NewsList news={news} />
      </Paper>
    </Container>
  )
}
