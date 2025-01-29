'use server'

import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import { editRoomSchema } from "./definitions";
import { redirect } from "next/navigation";
import { verifySession } from "../auth/session";
import { get } from "http";
import { getRoomCapacity } from "./utils";
import dayjs from "dayjs";

export const editRoom = async (state, data: FormData) => {
    const session = await verifySession();

    if (!session || session.role !== 'ADMIN') {
        redirect('/admin/rooms');
    }

    const idString = data.get('id')?.toString();
    
    const validationResult = await editRoomSchema.safeParseAsync({
        id: idString ? parseInt(idString) : null,
        name: data.get('name'),
        layout: data.get('layout'),
        information: data.get('information'),
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    const { id, name, layout, information } = validationResult.data;
    
    const roomOperation = id ? prisma.room.update({
        where: { id: id },
        data: {
            id: id,
            name: name,
            layout: layout,
            capacity: getRoomCapacity(layout),
            information: information,
        }
    }) : prisma.room.create({
        data: {
            name: name,
            layout: layout,
            capacity: getRoomCapacity(layout),
            information: information,
        }
    });

    const room = await roomOperation.then(
        (room) => { 
            console.debug(`room #${room.id} created`)
            console.debug(`^ room: ${JSON.stringify(room)}`)
            return room;
        }
    ).catch(
        handlePrismaError
    );

    if (room) {
       return { success: true }
    } else {
        console.error (`Error: could not ${id ? 'update' : 'create'} room`);
        return {
            errors: {
                general: `Error: could not ${id ? 'update' : 'create'} room`,
            }
        }
    }
}

export const getAdminRooms = async () => {
    const session = await verifySession();
    if (!session) { 
        redirect('/sign_in');
    }
    if (session.role !== 'ADMIN') {
        redirect('/');
    }

    return prisma.room.findMany().catch(handlePrismaError);

}

export const deleteRoom = async (id: number) => {
    const session = await verifySession();

    if (!session) {
        redirect('/sign_in');
    }

    if (session.role !== 'ADMIN') {
        redirect('/');
    }

    await prisma.room.delete({
        where: { id: id }
    }).catch(handlePrismaError);
};
