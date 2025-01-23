'use client';

import { Box, Divider, Typography } from "@mui/material";

const DisplayScreeningRoom = ({ layout }: { layout: string }) => {
    let parsedLayout: string[][] = [];
    try {
        parsedLayout = JSON.parse(layout);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        parsedLayout = [];
    };

    const x = `[
        ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30"],
    ]`;


    const renderSeat = (seat: string, seatIndex: number) => (typeof seat === 'string' || (seat as unknown) instanceof String) ? seat !== "*" ? 
    (
        <Box key={seatIndex} borderRadius={2} width={30} height={30} mx={0.2} border={1} display="flex" justifyContent="center" alignItems="center">
            {seat}
        </Box>
    ) : (
        <Box key={seatIndex} width={30} height={30} mx={0.2} display="flex" justifyContent="center" alignItems="center">
            
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