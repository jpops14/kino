'use client'

import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { screening } from "@prisma/client";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";

const Screenings = ({ searchParams, screenings } : { searchParams: URLSearchParams, screenings: {
    id: number;
    start: Date;
    movie_id: number;
    room_id: number;
    roomName: string;
    movieTitle: string;
}[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof screenings)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'start', valueFormatter: (value ) => dayjs(value).format('YYYY-MM-DD HH:mm'),  headerName: 'Start Time', width: 200 },
        { field: 'movieTitle', headerName: 'Movie', width: 200 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 150, 
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => triggerScreeningEditor(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const handleDelete = (id: number) => {
        // Implement delete functionality here
        console.log(`Delete user with id: ${id}`);
    };
    
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
