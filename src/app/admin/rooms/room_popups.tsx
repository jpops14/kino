import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import RoomEditor from "./room_editor";
import { DeleteDialog } from "@/app/_components/dialogs/delete_dialog";
import { deleteRoom } from "@/app/_lib/room/actions";

const RoomPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const room = searchParams.get("room");
    
    const editRoom = room ? await prisma.room.findUnique({ where: { id: parseInt(room) } }).catch(handlePrismaError) : null;

    return (
        <React.Fragment>
            {room !== null ? <RoomEditor roomData={editRoom} /> : null}
            <DeleteDialog onDelete={deleteRoom} />
        </React.Fragment>
    )
}

export default RoomPopups;
