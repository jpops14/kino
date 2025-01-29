'use client'

import { SessionUser } from "@/app/_lib/auth/session"
import { Avatar, Box, IconButton, Link, Menu, MenuItem } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react"


const  ProfileDropdown = ({ session }: { session:SessionUser | null }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();;
    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleAuthOption = (option: 'sign_in' | 'sign_up' | 'sign_out') => {
        handleMenuClose();
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set(option, '');
        router.push(`${pathname}?${updatedParams.toString()}`);
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
                    <MenuItem onClick={() => handleAuthOption('sign_out')}>Sign out</MenuItem> 
                ) : [
                        <MenuItem key="in" onClick={() => handleAuthOption('sign_in')}>Sign in</MenuItem>,
                        <MenuItem key="up" onClick={() => handleAuthOption('sign_up')}>Sign up</MenuItem>
                    ]
                }
            </Menu>
        ) : null}
        </React.Fragment>
    )
}

export default ProfileDropdown;