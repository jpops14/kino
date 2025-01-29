'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const handleDelete = (router: AppRouterInstance, pathname: string, searchParams: URLSearchParams, id: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('delete', id.toString());
    router.push(`${pathname}?${updatedSearchParams}`);
}


export const DeleteDialog = ({onDelete}: {onDelete: (id: number) => Promise<void>}) => {
    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const deleteParam = params.get('delete');
    const id = parseInt(deleteParam!);

    const onClose = () => {
        const updatedSearchParams = new URLSearchParams(params.toString());
        updatedSearchParams.delete('delete');
        router.push(`${pathname}?${updatedSearchParams}`);
    }
    
    return (
        <Dialog maxWidth='xs' fullWidth open={!!deleteParam} onClose={onClose}>
            <DialogTitle variant="h5" textAlign='center' >Deleting</DialogTitle>
            <DialogContent dividers>
                <Typography textAlign='center'>
                    Confirm delete action
                </Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'space-around'}}>
                <Button autoFocus onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={() => onDelete(id).then(onClose)}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}