import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './_lib/auth/session'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await verifySession();
    if (!session) {
        return NextResponse.redirect('/?sign_in')
    }
    if (session.role !== 'ADMIN') {
        return NextResponse.redirect('/')
    }
}

export const config = {
  matcher: '/admin/:path*',
}