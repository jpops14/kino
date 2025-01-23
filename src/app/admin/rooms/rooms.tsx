'use client'

import { Box, Button, Paper, Typography } from "@mui/material";
import { room } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";

const Rooms = ({ searchParams, rooms } : { searchParams: URLSearchParams, rooms: room[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof rooms)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'capacity', headerName: 'Capacity', width: 200 },
    ];

    const triggerRoomEditor = (params?: { row: room }) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('room', params?.row?.id?.toString() || '');
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4"> Manage Rooms </Typography>
                <Button variant="contained" onClick={() => triggerRoomEditor()}> Create room </Button>
            </Box>
            <Paper>
            <DataGrid
                getRowId={(row) => row.id}
                rows={rooms}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                onRowClick={triggerRoomEditor}
                initialState={{ pagination: { paginationModel } }}
            />
            </Paper>
        </Paper>
    );
}

export default Rooms;
