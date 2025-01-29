import { Container } from "@mui/material";
import React from "react";
import News from "./news";
import NewsPopups from "./news_popups";
import { handlePrismaError } from "@/app/_db/utils";
import prisma from "@/app/_db/db";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const news = await prisma.news.findMany().catch(handlePrismaError);

  return (
    <Container>
      <NewsPopups searchParams={params}/>
      <News news={news} searchParams={params}/>
    </Container>
  );
}
