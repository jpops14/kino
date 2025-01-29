'use client'

import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { user } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";


 const Users = ({ searchParams, users } : { searchParams: URLSearchParams, users: user[] }) => {    
    const pathname = usePathname()
    const router = useRouter();
    const paginationModel = { page: 0, pageSize: 10 };
    const columns: GridColDef<(typeof users)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'role', headerName: 'Role', width: 150 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 150, 
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => triggerUserEditor({ row: params.row })}>
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

    const triggerUserEditor = (params?: { row: user}) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('user', params?.row?.id?.toString() || '');
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <Paper sx={{ p: 2, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4"> Manage Users </Typography>
                <Button variant="contained" onClick={() => triggerUserEditor()}> Create user </Button>
            </Box>
            <Paper>
            <DataGrid
                getRowId={(row) => row.id}
                rows={users}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                onRowClick={triggerUserEditor}
                initialState={{ pagination: { paginationModel } }}
            />
            </Paper>
        </Paper>
    );
  }
  
  export default Users;