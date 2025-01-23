import { Container } from "@mui/material";;
import React from "react";
import Rooms from "./rooms";
import RoomPopups from "./room_popups";
import { handlePrismaError } from "@/app/_db/utils";
import prisma from "@/app/_db/db";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const rooms = await prisma.room.findMany().catch(handlePrismaError);

  return (
    <Container>
      <RoomPopups searchParams={params}/>
      <Rooms rooms={rooms} searchParams={params}/>
    </Container>
  );
}
