import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { verifySession } from "../_lib/auth/session";

export default async function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = verifySession()
    if (!session) {
        redirect('/')
    };

    const pages = ['screenings', 'news', 'movies', 'events', 'users', 'rooms', ];
  return (
    <Container>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 1,
        }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          p: 1,
          bgcolor: 'primary.main',
          color: 'white'
        }}>
            <Typography fontWeight='bold'> ADMIN PANEL </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', mt: 1, borderRadius: 10 }}>
                {pages.map((page, index) => (
                    <Button
                        variant="contained"
                        key={page}
                        href={`/admin/${page}`}
                        sx={{ 
                            bgcolor: 'white',
                            color: 'primary.main', 
                            display: 'block', 
                            borderTopLeftRadius: index === 0 ? 10 : 0,
                            borderBottomLeftRadius: index === 0 ? 10 : 0,
                            borderTopRightRadius: index === pages.length - 1 ? 10 : 0,
                            borderBottomRightRadius: index === pages.length - 1 ? 10 : 0,
                            '&:hover': {
                                bgcolor: 'white',
                            },
                            fontWeight: 'bold',
                        }} 
                    >
                        {page}
                    </Button>
                ))}
            </Box>
          </Box>
          </Box>
        {children}
    </Container>
  );
}
