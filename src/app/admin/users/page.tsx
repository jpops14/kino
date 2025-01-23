import { Container } from "@mui/material";;
import React from "react";
import Users from "./users";
import UserPopups from "./user_popups";
import { handlePrismaError } from "@/app/_db/utils";
import prisma from "@/app/_db/db";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const users = await prisma.user.findMany().catch(handlePrismaError);

  return (
    <Container>
      <UserPopups searchParams={params}/>
      <Users users={users} searchParams={params}/>
    </Container>
  );
}
