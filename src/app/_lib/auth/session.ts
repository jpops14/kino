import 'server-only'
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { role } from '../user/definitons';

const secret = "key"

const key = new TextEncoder().encode(secret)

const cookie = {
    name: "session",
    options: { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/'},
    duration: 24 * 60 * 60 * 1000,
}

type Session = {
    user: SessionUser,
    expires: Date,
}

export type SessionUser = {
    id: number,
    name: string,
    email: string,
    role: role,
};

export const encrypt = async (payload: Session) => new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)

export const decrypt = async (session?: string) => session ? jwtVerify(session, key, {
        algorithms: ['HS256']
    })
    .then((result) => result.payload as Session)
    .catch((reason) => {
        console.warn(`authError: ${JSON.stringify(reason)}`)
        console.debug(`^ session: ${session}`)
        return null
    }) : null


export const createSession = async (user: SessionUser) => {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ user, expires })
    const cookieStore = await cookies();
    await cookieStore.set(cookie.name, session, { ...cookie.options, expires })
}

export const verifySession = async (): Promise<SessionUser | null> => {
    const cookieStore = await cookies();
    const sessionCookie = await cookieStore.get(cookie.name)?.value
    const session = await decrypt(sessionCookie) as Session;
    if (session && session.expires  < new Date()) {
        await deleteSession()
        return null;
    }
    return session?.user || null;
}

export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(cookie.name)
}