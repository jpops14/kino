'use client'

import ErrorList from "@/app/_components/form/error_list";
import { editNews } from "@/app/_lib/news/actions";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { news } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const NewsEditor = ({ newsData }: { newsData: news | null }) => { 

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [state, action, pending] = useActionState(editNews, { errors: {}, });
    const [start, setStart] = useState<Dayjs | null>(dayjs(newsData?.publication));

    const news = searchParams.get('news');

    const onClose = () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('news');
        redirect(`${pathname}?${updatedParams.toString()}`);
    }

    useEffect(() => {  
        if(state.success) {
            onClose();
        };
    });

    const submitAction = (data: FormData) => {
        data.append('publication', start?.toDate().toISOString() || '');
        action(data);
    }

    return ( 
        <Dialog maxWidth="lg" open={news !== null} onClose={onClose}>
            <Box width={"lg"} sx={{ padding: 2 }}>
                <Typography variant="h5" textAlign={'center'}>
                    {newsData ? 'Edit News' : 'Add News'}
                </Typography>
                <Box component='form' action={submitAction}>
                    <TextField name="id" defaultValue={newsData?.id} label="id" fullWidth autoFocus sx={{ my: 1, display: 'none' }}/>
                    <ErrorList errors={state?.errors?.title} />
                    <TextField name="title" defaultValue={newsData?.title} label="Title" fullWidth autoFocus sx={{ my: 1 }}/>
                    <ErrorList errors={state?.errors?.subtitle} />
                    <TextField name="subtitle" defaultValue={newsData?.subtitle} label="Subtitle" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.content} />
                    <TextField name="content" minRows={10} multiline defaultValue={newsData?.content} label="Content" fullWidth  sx={{ my: 1 }} />
                    <ErrorList errors={state?.errors?.publication} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label={"Publication date"} 
                            value={start}
                            onAccept={(date) => setStart(date)}
                            slotProps={{ textField: { fullWidth: true, sx: { my: 1 } } }}
                        />
                    </LocalizationProvider>
                    <Button type="submit" disabled={pending} variant="contained" fullWidth>
                        {pending ? 'Submitting' : newsData ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default NewsEditor;
