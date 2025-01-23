import { Container } from "@mui/material";;
import React from "react";
import { handlePrismaError } from "@/app/_db/utils";
import prisma from "@/app/_db/db";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const screenings = await prisma.screening.findMany().catch(handlePrismaError);

  return (
    <Container>

    </Container>
  );
}
