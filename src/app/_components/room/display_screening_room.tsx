'use client';

import { Box, Divider, Typography } from "@mui/material";

const DisplayScreeningRoom = ({ layout, selectedSeats, lockedSeats, onSeatClick }: { layout: string, selectedSeats?: Set<string>, lockedSeats?: Set<string> | null, onSeatClick?: (seat: string) => void}) => {
    let parsedLayout: string[][] = [];
    try {
        parsedLayout = JSON.parse(layout);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        parsedLayout = [];
    }

    const renderSeat = (seat: string, seatIndex: number) => (typeof seat === 'string' || (seat as unknown) instanceof String) ? seat !== "*" ? 
    (
        <Box
            component="button"
            key={seatIndex}
            onClick={onSeatClick ? () => onSeatClick(seat) : undefined}
            disabled={!onSeatClick || lockedSeats?.has(seat)}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                border: 1,
                borderColor: "black",
                mx: 0.2,
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: lockedSeats?.has(seat) ? "red" : selectedSeats?.has(seat) ? "green" : "white",
            }}
        >
            <Typography bgcolor={lockedSeats?.has(seat) ? "red" : selectedSeats?.has(seat) ? "green" : "white"} color="black">{seat}</Typography>
        </Box>
    ) : (
        <Box key={seatIndex} width={30} height={30} mx={0.2} display="flex" justifyContent="center" alignItems="center" >

        </Box>
    ) : null

    return (
        <Box my={1} border={1} borderRadius={1} p={1} py="4" textAlign={"center"}>
            <Divider variant="middle" color="black" >
                <Typography variant="h6" textAlign="center" > SCREEN </Typography>
            </Divider>
            {Array.isArray(parsedLayout) ? parsedLayout.map((row, rowIndex) => (
                <Box key={rowIndex} display="flex" justifyContent={"center"} alignItems={"center"} my={0.2} color="black" >
                    {Array.isArray(row) ? row.map(renderSeat) : null}
                </Box>
            )) : null}
        </Box>
    )
};


export default DisplayScreeningRoom;