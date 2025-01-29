'use client'

import { useActionState, useEffect } from "react";
import { signUp } from "../_lib/auth/actions";
import { Box, Button, Container, Dialog, TextField, Typography } from "@mui/material";
import ErrorList from "../_components/form/error_list";

export const SignUpDialog = ({ open, onClose }: { open: boolean, onClose: () => void}) => {
    const [state, action, pending] = useActionState(signUp, { errors: {}});
    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });
    return (
        <Dialog open={open} onClose={onClose}>
            <Container maxWidth="xs" sx={{ padding: 2 }}>
                <Typography variant="h4" textAlign={'center'} sx={{mb: 2}}>
                    Sign up
                </Typography>
                <Box 
                    component='form' 
                    action={(data: FormData) => {
                        return action(data)
                    }}
                >
                    <ErrorList errors={state?.errors?.name} />
                    <TextField name="name" label="Full name" fullWidth autoFocus sx={{ my: 1 }}/>
                    <ErrorList errors={state?.errors?.email} />
                    <TextField name="email" label="email address" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.password} />
                    <TextField name="password" label="Password" fullWidth type="password"  sx={{ my: 1 }}/> 
                    <ErrorList errors={state?.errors?.general} />
                    <Button type="submit" disabled={pending} variant="contained" fullWidth>
                        {pending ? 'Submitting' : 'Sign up'}
                    </Button>
                </Box>
            </Container>
        </Dialog>
    )
}