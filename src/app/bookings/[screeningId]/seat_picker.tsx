'use client'

import DisplayScreeningRoom from "@/app/_components/room/display_screening_room";
import { createBookingAction } from "@/app/_lib/booking/actions";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
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
            <DisplayScreeningRoom layout={screeningData.room.layout} selectedSeats={selectedSeats} lockedSeats={lockedSeats} onSeatClick={onSeatClick} />
            {selectedSeats.size > 0 ? (
                <Alert severity="success" variant="outlined" sx={{ width: 'full' }}>
                    <Typography variant='h5'> Selected {selectedSeats.size} seats: {Array.from(selectedSeats).join(", ")} </Typography>
                    <Typography variant='h5'> Total: {selectedSeats.size * screeningData.price} EUR </Typography>
                    <Box component='form' action={onBookSeats} sx={{ width: 'full' }}>
                <Button variant='contained' type="submit" sx={{mx: 'auto'}} disabled={isConflicting || pending}> Book seats </Button>
            </Box>
                </Alert>
            ) : (
                <Alert severity="info" variant="outlined" sx={{ width: 'full' }}>
                    <AlertTitle textAlign='center' justifyContent='center'> Select your seats </AlertTitle>
                </Alert>
            )}
            {state?.error ? (
                <Alert severity="error">
                    <Typography> {state.error} </Typography>
                </Alert>
            ) : null}
        </Box>
        
    )
};

export default SeatPicker;