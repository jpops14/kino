import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import {  verifySession } from "../../_lib/auth/session";
import Link from "next/link";
import ProfileDropdown from "./profile_dropdown";

export default async function NavBar() {

    const session = await verifySession();

    const pages = ['bookings', 'movies', 'screenings', 'news', 'events', ...[session?.role === 'ADMIN' ? 'admin' : '']];

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                        >
                        KINO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        href={`/${page}`}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                <ProfileDropdown session={session} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
  