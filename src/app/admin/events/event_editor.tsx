
'use client'

import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Autocomplete, Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useActionState, useEffect } from "react";
import ErrorList from "@/app/_components/form/error_list";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { editEvent } from "@/app/_lib/event/actions";

const EventEditor = ({ eventData, screenings }: { eventData: {
    id: number,
    name: string,
    description: string,
    screenings: { id: number }[]
} | null, screenings: { id: number, start: Date, movieTitle: string, roomName: string}[] }) => { 
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [state, action, pending] = useActionState(editEvent, { errors: {}, });
    const { control, getValues } = useForm();

    const event = searchParams.get('event');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('event');
        redirect(`${pathname}?${updatedParams.toString()}`);
    }

    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });

    const eventScreeningsIds = eventData?.screenings.map((screening) => screening.id) || [];
    
    const submitAction = (data: FormData) => {
        getValues('screenings')?.forEach((screening) => data.append('screenings', screening.id.toString()));
        return action(data);
    }

    return ( 
        <Dialog maxWidth="lg" open={event !== null} onClose={onClose}>
            <Box width='lg' sx={{ padding: 2 }}>
            <Typography variant="h5" textAlign={'center'}>
                {eventData ? 'Edit Event' : 'Create Event'}
            </Typography>
            <Box component='form' action={submitAction}>
                <TextField name="id" defaultValue={eventData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }}/>
                <ErrorList errors={state?.errors?.name} />
                <TextField name="name" defaultValue={eventData?.name} label="Event Name" fullWidth autoFocus sx={{ my: 1 }}/>
                <ErrorList errors={state?.errors?.description} />
                <TextField name="description" minRows={5} multiline defaultValue={eventData?.description} label="Description" fullWidth  sx={{ my: 1 }} />
                <ErrorList errors={state?.errors?.screenings} />
                <Controller
                        name="screenings"
                        control={control}
                        defaultValue={eventData ? screenings.filter((screening) => eventScreeningsIds.includes(screening.id)) : []}
                        render={({ field: { value, onChange, ref, disabled }}) =>
                            <Autocomplete
                                sx={{my: 1}}
                                multiple
                                disabled={disabled}
                                value={value || null}
                                options={screenings}
                                getOptionKey={(option) => option.id}
                                getOptionLabel={(option ) => `${dayjs(option.start).format('YYYY-MM-DD HH:MM') } - ${option.movieTitle} - ${option.roomName}`}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField label={"Screenings"} {...params} inputRef={ref}/>}
                                onChange={(event, value) => onChange(value)}
                            /> 
                    }
                    />
                <ErrorList errors={state?.errors?.general} />
                <Button type="submit" disabled={pending} variant="contained" fullWidth>
                    {pending ? 'Submitting' : eventData ? 'Update' : 'Create'}
                </Button>
            </Box>
            </Box>
        </Dialog>
    )
}

export default EventEditor;