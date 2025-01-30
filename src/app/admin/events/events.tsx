'use client'

import { handleDelete } from "@/app/_components/dialogs/delete_dialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { event } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

const Events = ({ searchParams, events } : { searchParams: URLSearchParams, events: event[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof events)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 400 },
        { field: 'description', headerName: 'Description', width: 400 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 150, 
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => triggerEventEditor(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(router, pathname, searchParams, params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const triggerEventEditor = (params?: { row: event }) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('event', params?.row?.id?.toString() || '');
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4"> Manage Events </Typography>
                <Button variant="contained" onClick={() => triggerEventEditor()}> Create Event </Button>
            </Box>
            <Paper>
            <DataGrid
                getRowId={(row) => row.id}
                rows={events}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                initialState={{ pagination: { paginationModel } }}
            />
            </Paper>
        </Paper>
    );
}

export default Events;
