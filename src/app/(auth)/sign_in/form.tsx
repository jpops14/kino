'use client'

import { useActionState } from "react";
import { signIn } from "../_lib/actions";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export const SignInForm = () => {
    const [state, action, pending] = useActionState(signIn, { errors: {}});
    return (
        <Container maxWidth="xs">
             <Paper elevation={10} sx={{mt: 10, padding: 2}}>
                <Typography variant="h5">
                    Sign in
                </Typography>
                <Box component='form' action={action}>
                    <TextField name="email" placeholder="email address" fullWidth  sx={{ my: 1 }} />
                    <TextField name="password" placeholder="password" fullWidth type="password"  sx={{ my: 1 }}/> 
                    <Button type="submit" disabled={pending} variant="contained" fullWidth>
                        {pending ? 'Submitting' : 'Sign up'}
                    </Button>
                </Box>
             </Paper>
        </Container>
    )
}