'use client'

import { Box, Button, Paper, Typography } from "@mui/material";
import { screening } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";

const Screenings = ({ searchParams, screenings } : { searchParams: URLSearchParams, screenings: screening[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof screenings)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'start', headerName: 'Start Time', width: 200 },
        { field: 'movie_id', headerName: 'Movie ID', width: 200 },
        { field: 'room_id', headerName: 'Room ID', width: 200 },
    ];

    const triggerScreeningEditor = (params?: { row: screening }) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('screening', params?.row?.id?.toString() || '');
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4"> Manage Screenings </Typography>
                <Button variant="contained" onClick={() => triggerScreeningEditor()}> Create Screening </Button>
            </Box>
            <Paper>
            <DataGrid
                getRowId={(row) => row.id}
                rows={screenings}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                onRowClick={triggerScreeningEditor}
                initialState={{ pagination: { paginationModel } }}
            />
            </Paper>
        </Paper>
    );
}

export default Screenings;
