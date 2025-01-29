'use client'

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { movie } from "@prisma/client";
import { useActionState } from "react";
import { editMovie } from "../_lib/movie/actions";
import ErrorList from "../_components/form/error_list";

const MovieForm = ({ initialValues }: { initialValues: movie | null}) => { 
    const [state, action, pending] = useActionState(editMovie, { errors: {}, });

    return (
             <Paper elevation={10} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    Create movie
                </Typography>
                <Box component='form' action={action}>
                    <TextField name="id" defaultValue={initialValues?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }}/>
                    <ErrorList errors={state?.errors?.title} />
                    <TextField name="title" defaultValue={initialValues?.title} label="Title" fullWidth autoFocus sx={{ my: 1 }}/>
                    <ErrorList errors={state?.errors?.director} />
                    <TextField name="director" defaultValue={initialValues?.director} label="Director" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.description} />
                    <TextField name="description" defaultValue={initialValues?.description} label="Description" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.genre} />
                    <TextField name="genre" defaultValue={initialValues?.genre} label="Genre" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.year} />
                    <TextField name="year" defaultValue={initialValues?.year} label="Year" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.duration} />
                    <TextField name="duration" defaultValue={initialValues?.duration} label="Duration" fullWidth  sx={{ my: 1 }} />
                    <Button type="submit" variant="contained" fullWidth>
                        {pending ? 'Submitting' : initialValues ? 'Update' : 'Create'}
                    </Button>
                </Box>
             </Paper> 
    )
}

export default MovieForm;