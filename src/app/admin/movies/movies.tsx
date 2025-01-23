'use client'

import { Box, Button, Paper, Typography } from "@mui/material";
import { movie } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";

const Movies = ({ searchParams, movies } : { searchParams: URLSearchParams, movies: movie[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof movies)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'director', headerName: 'Director', width: 200 },
        { field: 'genre', headerName: 'Genre', width: 200 },
        { field: 'year', headerName: 'Year', width: 200 },
        { field: 'duration', headerName: 'Duration (m)', width: 200 },
    ];

    const triggerMovieEditor = (params?: { row: movie }) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('movie', params?.row?.id?.toString() || '');
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4"> Manage Movies </Typography>
                <Button variant="contained" onClick={() => triggerMovieEditor()}> Create movie </Button>
            </Box>
            <Paper>
            <DataGrid
                getRowId={(row) => row.id}
                rows={movies}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                onRowClick={triggerMovieEditor}
                initialState={{ pagination: { paginationModel } }}
            />
            </Paper>
        </Paper>
    );
}

export default Movies;
