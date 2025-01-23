'use client'

import { user } from "@prisma/client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Box, Button, Dialog, MenuItem, TextField, Typography } from "@mui/material";
import { editUser } from "@/app/_lib/user/actions";
import { useActionState, useEffect } from "react";
import ErrorList from "@/app/_components/form/error_list";

const UserEditor = ({ userData }: { userData: user | null}) => { 

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [state, action, pending] = useActionState(editUser, { errors: {}, });

    const user = searchParams.get('user');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('user');
        redirect(`${pathname}?${updatedParams.toString()}`);
    }

    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });

    return ( 
        <Dialog open={user !== null} onClose={onClose}>
            <Box sx={{ padding: 2 }}>
            <Typography variant="h5" textAlign={'center'}>
                {userData ? 'Edit user' : 'Create user'}
            </Typography>
            <Box component='form' action={action}>
                <TextField name="id" defaultValue={userData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }}/>
                <ErrorList errors={state?.errors?.name} />
                <TextField name="name" defaultValue={userData?.name} label="Name" fullWidth autoFocus sx={{ my: 1 }}/>
                <ErrorList errors={state?.errors?.email} />
                <TextField name="email" defaultValue={userData?.email} label="email address" fullWidth  sx={{ my: 1 }} />
                <ErrorList errors={state?.errors?.password} />
                <TextField name="password" defaultValue={userData?.password} label="Password" fullWidth type="password"  sx={{ my: 1 }}/>
                <ErrorList errors={state?.errors?.role} />
                <TextField select name="role" defaultValue={userData?.role || 'USER'} label='Role' fullWidth  sx={{ my: 1 }}>
                    {['ADMIN', 'USER'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}   
                </TextField>
                <ErrorList errors={state?.errors?.general} />
                <Button type="submit" disabled={pending} variant="contained" fullWidth>
                    {pending ? 'Submitting' : userData ? 'Update' : 'Create'}
                </Button>
            </Box>
            </Box>
        </Dialog>
    )
}

export default UserEditor;