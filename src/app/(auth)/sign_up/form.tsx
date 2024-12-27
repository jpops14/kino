'use client'

import { useActionState } from "react";
import { signUp } from "../_lib/actions";
import { Box, Button, Checkbox, Container, FormControlLabel, Paper, TextField, Typography } from "@mui/material";

export const SignUpForm = () => {
    const [state, action, pending] = useActionState(signUp, { errors: {}});
    return (
        <Container maxWidth="xs">
             <Paper elevation={10} sx={{mt: 10, padding: 2}}>
                <Typography variant="h5">
                    Sign up
                </Typography>
                <Box component='form' action={action}>
                    <TextField name="name" placeholder="Name" fullWidth autoFocus sx={{ my: 1 }}/>
                    <TextField name="email" placeholder="email address" fullWidth  sx={{ my: 1 }} />
                    <TextField name="password" placeholder="Password" fullWidth type="password"  sx={{ my: 1 }}/> 
                    <FormControlLabel control={<Checkbox value="terms" color="primary" />} label="I accept terms of use"  sx={{ my: 1 }}/>
                    <Button type="submit" disabled={pending} variant="contained" fullWidth>
                        {pending ? 'Submitting' : 'Sign up'}
                    </Button>
                </Box>
             </Paper>
        </Container>
    )
}