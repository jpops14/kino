'use client'

import { Box, Button, Container, Dialog, TextField, Typography } from "@mui/material";
import { useActionState, useEffect } from "react";
import ErrorList from "../_components/form/error_list";
import { signIn } from "../_lib/auth/actions";

export const SignInDialog = ({ open, onClose }: { open: boolean, onClose: () => void}) => {
    const [state, action, pending] = useActionState(signIn, { errors: {}});
    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.success]);

    return (
        <Dialog open={open} onClose={onClose}>
            <Container maxWidth="xs">
                <Box sx={{padding: 2}}>
                    <Typography variant="h4" textAlign={'center'} sx={{mb: 2}}>
                        Sign in
                    </Typography>
                    <Box 
                        component='form' 
                        action={(data: FormData) => {
                            return action(data)
                        }}
                    >
                        <ErrorList errors={state?.errors?.email} />
                        <TextField name="email" label="email address" fullWidth  sx={{ mb: 1 }} />
                        <ErrorList errors={state?.errors?.password} />
                        <TextField name="password" label="password" fullWidth type="password"  sx={{ mb: 1 }}/> 
                        <ErrorList errors={state?.errors?.general} />
                        <Button type="submit" disabled={pending} variant="contained" fullWidth>
                            {pending ? 'Submitting' : 'Sign in'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Dialog>
    )
}