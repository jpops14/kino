'use client'

import { TextField } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { debounce } from '@mui/material/utils'

const SearchBar = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter();
    const [localState, setLocalState] = useState<string>(searchParams.get('search') || '');

    const updateSearch = (search: string) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("search", search);
        router.push(`${pathname}?${updatedParams.toString()}`);
    }
    const debouncedUpdate = debounce(updateSearch, 500);

    return (
        <TextField
            id="search-bar"
            label="Search"
            variant="outlined"
            fullWidth
            value={localState}
            onChange={(e) => {
                setLocalState(e.target.value);
                debouncedUpdate(e.target.value);
            }}
        />
    )
}

export default SearchBar;

