import { DeleteDialog } from "@/app/_components/dialogs/delete_dialog";
import { deleteUser, getUser } from "@/app/_lib/user/actions";
import React from "react";
import UserEditor from "./user_editor";

const UserPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const user = searchParams.get("user");
    
   const editUser = user ? await getUser(parseInt(user)) : null;

    return (
        <React.Fragment>
            {user !== null ? <UserEditor userData={editUser} /> : null}
            <DeleteDialog onDelete={deleteUser} />
        </React.Fragment>
    )
}

export default UserPopups;