import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import UserEditor from "./user_editor";
import { getUser } from "@/app/_lib/user/actions";

const UserPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const user = searchParams.get("user");
    
   const editUser = user ? await getUser(parseInt(user)) : null;

    return (
        <React.Fragment>
            {user !== null ? <UserEditor userData={editUser} /> : null}
        </React.Fragment>
    )
}

export default UserPopups;