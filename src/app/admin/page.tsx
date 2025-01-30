import { redirect } from "next/navigation";
import { verifySession } from "../_lib/auth/session";
import { Box } from "@mui/material";

export default async function Page() {
    const session = await verifySession();
    redirect(session?.role === 'ADMIN' ? '/admin/screenings' : session ? '/' : '/?sign_in');
    return(<Box/>);
  }