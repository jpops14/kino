'use client'

import { useActionState, useEffect } from "react";
import { signIn } from "../_lib/auth/actions";
import { Box, Button, Container, Dialog, List, ListItem, TextField, Typography } from "@mui/material";
import ErrorList from "../_components/form/error_list";

export const SignInDialog = ({ open, onClose }: { open: boolean, onClose: () => void}) => {
    const [state, action, pending] = useActionState(signIn, { errors: {}});
    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });

    console.log(state?.errorss?.email)
    return (
        <Dialog open={open} onClose={onClose}>
            <Container maxWidth="xs">
                <Box sx={{padding: 2}}>
                    <Typography variant="h4" textAlign={'center'}>
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
                        <ErrorList errors={state?.errors?.base} />
                        <Button type="submit" disabled={pending} variant="contained" fullWidth>
                            {pending ? 'Submitting' : 'Sign in'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Dialog>
    )
}