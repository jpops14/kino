import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import { deleteSession, verifySession } from "./(auth)/_lib/session";

export default async function NavBar() {

    const session = await verifySession();

    console.log(session);

    const pages = ['blog', 'movies'];

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={session ? "Sign in" : "Go to dashboard"}>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar>
                        {session ? session.name?.split(' ')?.map((value: string) => value.at(0)?.toUpperCase()) : '?'}
                        </Avatar>
                    </IconButton>
                    </Tooltip>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
  