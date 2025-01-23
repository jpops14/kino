'use client'

import { SessionUser } from "@/app/_lib/auth/session"
import { Avatar, Box, IconButton, Link, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/navigation";
import React from "react"


const  ProfileDropdown = ({ session }: { session:SessionUser | null }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleOption=(option: 'sign_in' | 'sign_up' | 'sign_out' )=> {
        handleMenuClose();
        if (option === 'sign_in'){ 
            router.push('/?sign_in');
        } else if (option === 'sign_up') {
            router.push('/?sign_up');
        } else if (option === 'sign_out') {
            router.push('/?sign_out');
        }
    }

    const anchorId = 'profile-menu';

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 0 }}>
                <IconButton sx={{ p: 0 }}
                    size="large"
                    edge="end"
                    aria-controls={anchorId}
                    onClick={handleOpenProfileMenu}
                    color="inherit"
                >
                    <Avatar>
                    {session ? session.name?.split(' ')?.map((value: string) => value.at(0)?.toUpperCase()) : '?'}
                    </Avatar>
                </IconButton>
            </Box>
            {anchorEl ? (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                id={'profilemenu'}
                keepMounted
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {session ? (
                    <MenuItem onClick={() => handleOption('sign_out')}>Sign out</MenuItem> 
                ) : [
                        <MenuItem key="in" onClick={() => handleOption('sign_in')}>Sign in</MenuItem>,
                        <MenuItem key="up" onClick={() => handleOption('sign_up')}>Sign up</MenuItem>
                    ]
                }
            </Menu>
        ) : null}
        </React.Fragment>
    )
}

export default ProfileDropdown;