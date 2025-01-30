import { getAdminRooms } from "@/app/_lib/room/actions";
import { Container } from "@mui/material";
import RoomPopups from "./room_popups";
import Rooms from "./rooms";
;

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {

  const paramsRecord = await searchParams;
  const params = new URLSearchParams(paramsRecord);
  const rooms = await getAdminRooms() || []

  return (
    <Container>
      <RoomPopups searchParams={params}/>
      <Rooms rooms={rooms} searchParams={params}/>
    </Container>
  );
}
