'use client'

import DisplayScreeningRoom from "@/app/_components/room/display_screening_room";
import { createBookingAction } from "@/app/_lib/booking/actions";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useActionState, useEffect, useState } from "react";

const SeatPicker = ({ screeningData }: { screeningData: {
    id: number;
    start: Date;
    room: {
        name: string;
        information: string | null;
        layout: string;
    };
    price: number;
    movie: {
        title: string;
        year: number;
        director: string;
        genre: string;
        description: string;
        duration: number;
    };
    lockedSeats: Set<string>;
} }) => {
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
    const [lockedSeats, setLockedSeats] = useState<Set<string> | null>(screeningData.lockedSeats || new Set());
    const [state, action, pending] = useActionState(createBookingAction, {} as { error?: string, updatedLockedSeats?: Set<string> } | undefined);

    useEffect(() => {
        if (state?.updatedLockedSeats) {
            setLockedSeats(state.updatedLockedSeats);
            setSelectedSeats(selectedSeats.difference(state.updatedLockedSeats));
        }
    }, [state?.updatedLockedSeats])

    const onSeatClick = (seat: string) => {
        if (selectedSeats.has(seat)) {
            selectedSeats.delete(seat);
        } else {
            selectedSeats.add(seat);
        }
        setSelectedSeats(new Set(selectedSeats));
    }

    const isConflicting = (lockedSeats?.intersection(selectedSeats)?.size || 0) > 0;

    const onBookSeats = async () => {
        action({
            screeningId: screeningData.id,
            selectedSeats,
            total: selectedSeats.size * screeningData.price,
        });
    }

    return (
        <Box>
            <Box sx={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Typography variant='h4'> Screening detail </Typography>
                <Typography variant='h5'> {dayjs(screeningData.start).format('YYYY-MM-DD HH:mm')} </Typography>
                <Typography variant='h5'> {screeningData.room.name} </Typography>
                <Typography variant='h6'> {screeningData.room.information} </Typography>
            </Box>
            <DisplayScreeningRoom layout={screeningData.room.layout} selectedSeats={selectedSeats} lockedSeats={lockedSeats} onSeatClick={onSeatClick} />
            {selectedSeats.size > 0 ? (
                <Alert severity="success" variant="outlined" sx={{ outline: 2, width: 'full', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant='h5'> Selected {selectedSeats.size} seats: {Array.from(selectedSeats).join(", ")} </Typography>
                    <Typography variant='h5' sx={{ my: 0.5 }}> Total: {selectedSeats.size * screeningData.price} EUR </Typography>
                    <Box component='form' action={onBookSeats} sx={{ width: 'full', textAlign: 'center', mt: 1 }}>
                        <Button variant='contained' type="submit" sx={{ mx: 'auto' }} disabled={isConflicting || pending}> Book seats </Button>
                    </Box>
                </Alert>
            ) : (
                <Alert severity="info" variant="outlined" sx={{ width: 'full', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AlertTitle sx={{ width: '100%', textAlign: 'center' }}> 
                        <Typography variant="h4" textAlign='center'>
                            Select your seats 
                        </Typography>
                    </AlertTitle>
                </Alert>
            )}
            {state?.error ? (
                <Alert severity="error" sx={{ textAlign: 'center' }}>
                    <Typography> {state.error} </Typography>
                </Alert>
            ) : null}
        </Box>
        
    )
};

export default SeatPicker;