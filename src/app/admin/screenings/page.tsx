import { Container } from "@mui/material";;
import React from "react";
import Screenings from "./screenings";
import ScreeningPopups from "./screening_popups";
import { getAdminScreenings } from "@/app/_lib/screening/actions";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const screenings = await getAdminScreenings() || [];

  return (
    <Container>
      <ScreeningPopups searchParams={params}/>
      <Screenings screenings={screenings} searchParams={params}/>
    </Container>
  );
}
