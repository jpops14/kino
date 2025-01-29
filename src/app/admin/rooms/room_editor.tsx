'use client'

import { room } from "@prisma/client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { editRoom } from "@/app/_lib/room/actions";
import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { editRoomSchema } from "@/app/_lib/room/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import DisplayScreeningRoom from "@/app/_components/room/display_screening_room";
import ErrorList from "@/app/_components/form/error_list";

const RoomEditor = ({ roomData }: { roomData: room | null }) => { 

    const [state, action, pending] = useActionState(editRoom, { errors: {},});
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const ref = useRef<HTMLFormElement>(null);

    const { register, watch } = useForm<Zod.output<typeof editRoomSchema>>(
        {
            defaultValues: {
                id: roomData?.id,
                name: roomData?.name || '',
                layout: roomData?.layout || 
                '[\n   [],\n   [],\n   []\n]',
                information: roomData?.information || '',
            },
        }
    );

    const room = searchParams.get('room');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('room');
        redirect(`${pathname}?${updatedParams.toString()}`);
    }

    useEffect(() => {
        if(state.success) {
            onClose();
        };
    });

    const layout = watch('layout');

    return ( 
        <Dialog maxWidth={false} open={room !== null} onClose={onClose}>
            <Box width={"lg"} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    {roomData ? 'Edit room' : 'Create room'}
                </Typography>
                <Box width={"full"} component='form' ref={ref} action={action}
                >
                    <TextField defaultValue={roomData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }} {...register('id')} />
                    <ErrorList errors={state?.errors?.name} />
                    <TextField defaultValue={roomData?.name} label="Name" fullWidth autoFocus sx={{ my: 1 }} {...register('name')} />
                    <ErrorList errors={state?.errors?.information} />
                    <TextField defaultValue={roomData?.information} label="Information" fullWidth  sx={{ my: 1 }} {...register('information')} />
                    <Typography variant="h6">
                        Please provide the layout of the screening room in the following format:
                        - Each row is a list of seats
                        - Each seat is represented by an empty string
                        - Each empty string represents an empty seat
                        - Each seat can be occupied by a person
                    </Typography>
                    <ErrorList errors={state?.errors?.layout} />
                    <TextField minRows={10} multiline defaultValue={roomData?.layout} label="Layout" fullWidth  sx={{ my: 1 }} {...register('layout')} />
                    <DisplayScreeningRoom layout={layout} />
                    <Button id="submit" disabled={pending} type="submit" variant="contained" fullWidth>
                        {pending ? 'Submitting' : roomData ? 'Update' : 'Create'}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default RoomEditor;
