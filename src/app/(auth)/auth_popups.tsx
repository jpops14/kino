'use client'

import React from "react";
import { SignUpDialog } from "./sign_up_dialog";
import { SignInDialog } from "./sign_in_dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SignOutDialog } from "./sign_out_dialog";

const AuthPopups = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const signIn = searchParams.get("sign_in");
    const signUp = searchParams.get("sign_up");
    const signOut = searchParams.get("sign_out");

    const onClose = (param: string) => () => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete(param);
        router.back();
    }

    return (
        <React.Fragment>
            <SignInDialog open={signIn !== null} onClose={onClose('sign_in')}/>
            <SignUpDialog open={signUp !== null} onClose={onClose('sign_up')}/>
            <SignOutDialog isOpen={signOut !== null} onClose={onClose('sign_out')}/>
        </React.Fragment>
    )
}

export default AuthPopups;