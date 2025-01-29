import { Container } from "@mui/material";;
import React from "react";
import Users from "./users";
import UserPopups from "./user_popups";
import { getAdminUsers } from "@/app/_lib/user/actions";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const users = await getAdminUsers()

  return (
    <Container>
      <UserPopups searchParams={params}/>
      <Users users={users} searchParams={params}/>
    </Container>
  );
}
