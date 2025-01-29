import { Container } from "@mui/material";;
import React from "react";
import Events from "./events";
import EventPopups from "./event_popups";
import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const events = await prisma.event.findMany().catch(handlePrismaError);

  return (
    <Container>
      <EventPopups searchParams={params}/>
      <Events events={events} searchParams={params}/>
    </Container>
  );
}
