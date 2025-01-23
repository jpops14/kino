'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { signOut } from "../_lib/auth/actions";

export const SignOutDialog = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
    return (
        <Dialog maxWidth='xs' fullWidth open={isOpen} onClose={onClose}>
            <DialogTitle variant="h5" textAlign='center' >Sign out</DialogTitle>
            <DialogContent dividers>
                <Typography textAlign='center'>
                    Are you sure?
                </Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'space-around'}}>
                <Button autoFocus onClick={onClose}>
                    No
                </Button>
                <Button onClick={() => signOut().then(onClose)}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}