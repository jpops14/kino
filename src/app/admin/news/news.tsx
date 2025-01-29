'use client'

import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { news } from "@prisma/client";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";

const News = ({ searchParams, news } : { searchParams: URLSearchParams, news: news[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof news)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'subtitle', headerName: 'Subtitle', width: 200 },
        { field: 'publication', headerName: 'Publication Date', width: 200 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 150, 
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => triggerNewsEditor(params)}>
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

    const triggerNewsEditor = (params?: { row: news }) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('news', params?.row?.id?.toString() || '');
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4"> Manage News </Typography>
                <Button variant="contained" onClick={() => triggerNewsEditor()}> Create News </Button>
            </Box>
            <Paper>
            <DataGrid
                getRowId={(row) => row.id}
                rows={news}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                onRowClick={triggerNewsEditor}
                initialState={{ pagination: { paginationModel } }}
            />
            </Paper>
        </Paper>
    );
}

export default News;
