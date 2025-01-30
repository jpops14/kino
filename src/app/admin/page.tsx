import { redirect } from "next/navigation";
import { verifySession } from "../_lib/auth/session";

export default async function Page() {
    const session = await verifySession();
    redirect(session?.role === 'ADMIN' ? '/admin/screenings' : session ? '/' : '/?sign_in');
    return(null);
  }