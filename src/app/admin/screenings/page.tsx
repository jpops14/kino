import { Container } from "@mui/material";;
import React from "react";
import Screenings from "./screenings";
import { handlePrismaError } from "@/app/_db/utils";
import prisma from "@/app/_db/db";
import ScreeningPopups from "./screening_popups";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const screenings = await prisma.screening.findMany().catch(handlePrismaError);

  return (
    <Container>
      <ScreeningPopups searchParams={params}/>
      <Screenings screenings={screenings} searchParams={params}/>
    </Container>
  );
}
