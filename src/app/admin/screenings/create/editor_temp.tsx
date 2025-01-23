'use client'

import { screening } from "@prisma/client";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Autocomplete, Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { editScreening, getRoomScreeningsAndCapacity } from "@/app/_lib/screening/actions";
import { useActionState, useEffect, useState, useTransition } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import ErrorList from "@/app/_components/form/error_list";

const ScreeningEditor = ({ screeningData, movies, rooms }: {
    screeningData: screening | null,
    movies: {
        id: number,
        title: string,
        director: string, 
        year: number,
        duration: string,
    }[],
    rooms: {
        id: number,
        name: string,
        capacity: number,
    }[],
}) => { 
    const [state, action, pending] = useActionState(editScreening, { errors: {}, });
    const [isPending, startTransition] = useTransition();
    const { control, resetField, register, watch } = useForm();
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [data, setData] = useState<{ capacity: number, screenings: { start: Date, end: Date }[] } | null>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('screening');
        redirect(`${pathname}?${updatedParams.toString()}`);
    }
    
    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });

    const submitAction = async (data: FormData) => {
        data.append('start', startDate?.toDate()?.toString() || '');
        data.append('startTime', startTime?.toDate()?.toString() || '');
        return action(data);
    }

    const onDateSelect = async (date: Dayjs | null) => {
        if(date === null) return;
        startTransition(async () => {
            setStartDate(date);
            setStartTime(null);
            const newData = await getRoomScreeningsAndCapacity(room_id, date.toDate());
            setData(newData);
        });
    }


    const movie_id = watch('movie');
    const room_id = watch('room');
    const screening = searchParams.get('screening');

    console.log(room_id, movie_id, startDate, startTime, data);

    return ( 
        <Dialog maxWidth={false} open={screening !== null} onClose={onClose}>
            <Box width={"xl"} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    {screeningData ? 'Edit Screening' : 'Add Screening'}
                </Typography>
                <Box sx={{ width: 'full' }} component='form' action={submitAction}>
                    <TextField defaultValue={screeningData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }} {...register('id')}/>
                    <ErrorList errors={state?.errors?.movie_id} />
                    <Autocomplete
                        options={movies}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} defaultValue={screeningData?.movie_id} label="Movie" fullWidth  sx={{ my: 1 }} {...register('movie')}/>}
                    /> 
                    <ErrorList errors={state?.errors?.room_id} />
                    <Autocomplete
                        options={rooms}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.name}
                        disabled={!movie_id}
                        renderInput={(params) => <TextField {...params} defaultValue={screeningData?.room_id} label="Room" fullWidth  sx={{ my: 1 }} {...register('room')}/>}
                    />
                    <ErrorList errors={state?.errors?.start} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label={"Date"} 
                            value={startDate}
                            disabled={!room_id || !movie_id}
                            onChange={onDateSelect}
                            disablePast
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label={"Time"}
                            sx={{ width: 'full' }}
                            shouldDisableTime={(value) => !!data?.screenings.some((screening) => value.isAfter(dayjs(screening.start)) && value.isBefore(dayjs(screening.end)))}
                            disablePast
                            disabled={!room_id || !movie_id || !startDate || isPending || !data} 
                            value={startDate}
                            onChange={setStartTime}
                            minutesStep={5} />
                    </LocalizationProvider>
                    <Typography variant="h6" sx={{ alignSelf: 'center', mr: 1 }}> Summary </Typography>
                    <Box sx={{ display: 'flex', width: 'full', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}> 
                        <Typography variant="h6" sx={{ alignSelf: 'start', mr: 1 }}> Screening room capacity: {data?.capacity} </Typography>
                        <VisibilityIcon/>
                    </Box>
                    <Typography variant="h6" sx={{ alignSelf: 'start', mr: 1 }}> Start time: {startDate?.format('HH:mm')} </Typography>
                    <Typography variant="h6" sx={{ alignSelf: 'start', mr: 1 }}> End time:  </Typography>
                    <Button type="submit" disabled={pending || !startTime} variant="contained" fullWidth>
                        {pending ? 'Submitting' : screeningData ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ScreeningEditor;
