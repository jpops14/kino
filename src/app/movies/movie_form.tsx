'use client'

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { movie } from "@prisma/client";
import { useActionState } from "react";
import { editMovie } from "../_lib/movie/actions";

const MovieForm = ({ initialValues }: { initialValues: movie | null}) => { 
    const [state, action, pending] = useActionState(editMovie, { errors: {}, });

    return (
             <Paper elevation={10} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    Add movie
                </Typography>
                <Box component='form' action={action}>
                    <TextField defaultValue={initialValues?.id} name="id" fullWidth />
                    {state?.errors?.description && <Typography color="error">{state?.errors?.description}</Typography>}
                    <TextField defaultValue={initialValues?.title} name="title" placeholder="Title" fullWidth  sx={{ my: 1 }} />
                    {state?.errors?.director && <Typography color="error">{state?.errors?.director}</Typography>}
                    <TextField defaultValue={initialValues?.director}name="director" placeholder="Director" fullWidth  sx={{ my: 1 }}/> 
                    {state?.errors?.description && <Typography color="error">{state?.errors?.description}</Typography>}
                    <TextField defaultValue={initialValues?.description} multiline minRows={4} name="description" placeholder="Description" fullWidth  sx={{ my: 1 }}/> 
                    {state?.errors?.genre && <Typography color="error">{state?.errors?.genre}</Typography>}
                    {state?.errors?.duration && <Typography color="error">{state?.errors?.duration}</Typography>}
                    {state?.errors?.year && <Typography color="error">{state?.errors?.year}</Typography>}
                    <TextField defaultValue={initialValues?.genre} name="genre" placeholder="Genre"  sx={{ my: 1, width: "33%" }}/>
                    <TextField defaultValue={initialValues?.duration} name="duration" placeholder="Duration (minutes)" type="number" sx={{ my: 1, width: "33%" }}/>
                    <TextField defaultValue={initialValues?.year} name="year" placeholder="year" type="number" sx={{ my: 1, width: "33%" }}/>
                    <Button type="submit" variant="contained" fullWidth>
                        {false ? 'Submitting' : initialValues ? 'Update' : 'Add'}
                    </Button>
                </Box>
             </Paper>
    )
}

export default MovieForm;