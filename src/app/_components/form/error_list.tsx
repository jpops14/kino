'use client'

import { List, ListItem, Typography } from "@mui/material";

const ErrorList = ({ errors }: { errors?: string | string[] }) => errors ? (
    <List sx={{ listStyleType: 'disc', padding: 0 }} disablePadding dense>
        {(Array.isArray(errors) ? errors : [errors]).map((message: string, index: number) => (
            <ListItem key={index} sx={{ display: 'list-item', listStylePosition: 'inside', alignItems: 'baseline' }} disableGutters disablePadding>
                <Typography color="error" component="span">{message}</Typography>
            </ListItem>
        ))}
    </List>
) : null;

export default ErrorList;