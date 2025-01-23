'use client'

import { movie, room, screening } from "@prisma/client";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Alert, Autocomplete, Box, Button, Dialog, TextField, Tooltip, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { editScreening, getRoomScreeningsAndCapacity } from "@/app/_lib/screening/actions";
import { FormEvent, useActionState, useEffect, useState, useTransition } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";
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
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [data, setData] = useState<{ start: Date, end: Date }[] | null>(null);
    const [isPending, startTransition] = useTransition();
    const { control, register, watch } = useForm();
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

    const onDateSelect = async (date: Dayjs | null) => {
        if(date === null) return;
        startTransition(async () => {
            setStartDate(date);
            setStartTime(null);
            const newData = await getRoomScreeningsAndCapacity(room, date.toDate());
            setData(newData);
        });
    }

    const isConflicting = (value: Dayjs) => {
        if (value && startDate && selectedMovie) {
            const start = startDate.add(value.hour(), 'hour').add(value.minute(), 'minute');
            const end = start.add(selectedMovie?.duration, 'minute');
            return data?.some((busy) => {
                const busyStart = dayjs(busy.start);
                const busyEnd = dayjs(busy.end);
                return (
                    (start.isBefore(busyStart) && end.isAfter(busyEnd))
                    || (start.isAfter(busyStart) && start.isBefore(busyEnd))
                    || (end.isAfter(busyStart) && end.isBefore(busyEnd))
                )
            }) || false;
        }
        return false
    }

    const selectedMovie: movie | null = watch('movie');
    const selectedRoom: room | null = watch('room');
    const price = watch('price');
    const screening = searchParams.get('screening');

    const submitAction = async (data: FormData) => {
        if(!startDate || !startTime || !selectedMovie || !selectedRoom) return;
        data.set('start', startDate.add(startTime.hour(), 'hour').add(startTime.minute(), 'minute').toDate().toISOString() || '');
        data.set('movie_id', selectedMovie.id.toString());
        data.set('room_id', selectedRoom.id.toString());
        return action(data);
    }

    return ( 
        <Dialog maxWidth={false} open={screening !== null} onClose={onClose}>
            <Box width={"xl"} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    {screeningData ? 'Edit Screening' : 'Add Screening'}
                </Typography>
                <Box sx={{ width: 'full' }} component='form' action={submitAction}>
                    <TextField defaultValue={screeningData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }} {...register('id')}/>
                    <ErrorList errors={state?.errors?.movie_id} />
                    <Controller
                        name="movie"
                        control={control}
                        disabled={!!screeningData}
                        defaultValue={screeningData ? movies.find((movie) => movie.id === screeningData?.movie_id) : null}
                        render={({ field: { value, onChange, ref, disabled }}) =>
                            <Autocomplete
                                sx={{my: 1}}
                                disabled={disabled}
                                value={value || null}
                                options={movies}
                                getOptionKey={(option) => option.id}
                                getOptionLabel={(option) => `${option.title} - ${option.director} (${option.year})`}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField label={"Movie"} {...params} inputRef={ref}/>}
                                onChange={(event, value) => onChange(value)}
                            /> 
                    }
                    />
                    <ErrorList errors={state?.errors?.room_id} />
                    <Controller
                        name="room"
                        control={control}
                        disabled={!!screeningData || !selectedMovie}
                        defaultValue={screeningData ? rooms.find((room) => room.id === screeningData?.room_id) : null}
                        render={({ field: { value, onChange, ref, disabled }}) =>
                            <Autocomplete
                                sx={{my: 1}}
                                disabled={disabled}
                                value={value || null}
                                options={rooms}
                                getOptionKey={(option) => option.id}
                                getOptionLabel={(option) => `${option.name} (${option.capacity})`}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField label={"Room"} {...params} inputRef={ref}/>}
                                onChange={(event, value) => onChange(value)}
                            /> 
                    }
                    />
                    <ErrorList errors={state?.errors?.start} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label={"Date"} 
                            value={startDate}
                            disabled={!selectedMovie || !selectedRoom}
                            onChange={onDateSelect}
                            disablePast
                            slotProps={{ textField: { fullWidth: true, sx: { my: 1 } } }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label={"Time"}
                            shouldDisableTime={(value) => isConflicting(value)}
                            disabled={!selectedMovie || !selectedRoom || !startDate} 
                            value={startTime}
                            onChange={setStartTime}
                            minutesStep={5}
                            slotProps={{ textField: { fullWidth: true, sx: { my: 1 } } }}    
                        />
                    </LocalizationProvider>
                    <ErrorList errors={state?.errors?.price} />
                    <TextField label="Ticket price" type='number' required defaultValue={screeningData?.price || 0} fullWidth  sx={{ my: 1 }} {...register('price')} />
                    <Alert icon={false} severity="info" variant="outlined" sx={{ my: 2, width: 'full' }}>
                        <Typography variant="h6" sx={{ alignSelf: 'center', mr: 1 }}> Summary </Typography>
                        {selectedRoom && (<Typography variant="h6" sx={{ alignSelf: 'start', mr: 1 }}> Screening room capacity: {selectedRoom.capacity} </Typography>)}
                        {selectedMovie && startTime && (<Typography variant="h6" sx={{ alignSelf: 'start', mr: 1 }}> Starts at: {startTime?.format('HH:mm')} </Typography>)}
                        {selectedMovie && startTime && (<Typography variant="h6" sx={{ alignSelf: 'start', mr: 1 }}> Ends at: {startTime?.add(selectedMovie.duration, 'm').format('HH:mm')} </Typography>)}
                    </Alert>
                    <Button type="submit" disabled={pending || !startTime || !startDate || !selectedMovie || !price || !selectedRoom} variant="contained" fullWidth>
                        {pending ? 'Submitting' : screeningData ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ScreeningEditor;
