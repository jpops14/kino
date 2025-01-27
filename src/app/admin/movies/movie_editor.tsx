'use client'

import { movie } from "@prisma/client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Box, Button, Dialog, MenuItem, TextField, Typography } from "@mui/material";
import { editMovie } from "@/app/_lib/movie/actions";
import { useActionState, useEffect } from "react";
import ErrorList from "@/app/_components/form/error_list";

const MovieEditor = ({ movieData }: { movieData: movie | null }) => { 

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [state, action, pending] = useActionState(editMovie, { errors: {}, });

    const movie = searchParams.get('movie');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('movie');
        redirect(`${pathname}?${updatedParams.toString()}`);
    }

    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });

    return ( 
        <Dialog maxWidth="lg" open={movie !== null} onClose={onClose}>
            <Box width={"lg"} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    {movieData ? 'Edit movie' : 'Add movie'}
                </Typography>
                <Box component='form' action={action}>
                    <TextField name="id" defaultValue={movieData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }}/>
                    <ErrorList errors={state?.errors?.title} />
                    <TextField name="title" defaultValue={movieData?.title} label="Title" fullWidth autoFocus sx={{ my: 1 }}/>
                    <ErrorList errors={state?.errors?.director} />
                    <TextField name="director" defaultValue={movieData?.director} label="Director" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.genre} />
                    <TextField name="genre" defaultValue={movieData?.genre} label="Genre" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.year} />
                    <TextField name="year" defaultValue={movieData?.year} label="Year" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.duration} />
                    <TextField name="duration" type='number' defaultValue={movieData?.duration} label="Duration (Minutes)" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.description} />
                    <TextField name="description" minRows={10} multiline defaultValue={movieData?.description} label="Description" fullWidth  sx={{ my: 1 }} />
                    <Button type="submit" disabled={pending} variant="contained" fullWidth>
                        {pending ? 'Submitting' : movieData ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default MovieEditor;
