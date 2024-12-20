
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { redirect } from "next/navigation";


export interface LoginPaylod {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    user: {
        name: string,
        email: string,
        created_at: Date,
        updated_at: Date,
        status: string,
        organization_sector_id: string,
        id: string
    },
    token: string
}

export interface UserSession {
    id: string,
    email: string
    name: string,
    created_at: Date,
    updated_at: Date,
    status: string,
    organization_sector_id: string,
    acessToken: string,
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(3) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const payload = parsedCredentials.data;;
                    const user = await fetchLogin(payload);

                    if (user) return user

                    return null
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            user && (token.user = user);
            return token
        },
        session({ session, token }) {
            session.user = token.user as any
            return session
        }
    }

})
const urlBackend = process.env.URL_API;

export async function fetchLogin(dataPayload: LoginPaylod) {
    try {
        const response = await fetch(urlBackend + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataPayload)
        })
        if (response.ok) {
            const dataOrigin = <UserLoginResponse>await response.json();
            const user: UserSession = {
                ...dataOrigin.user,
                acessToken: dataOrigin.token
            }
            return user
        }

        return null

    } catch (error) {
        console.log('Error request api login: ', error)
        return null
    }
}

export const verifyAuthRequest = async () => {
    const session = await auth()

    if (!session) {
        redirect('/')
    }
    const BearedToken = `Bearer ${session.user.acessToken}`
    const headersWithAuth = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': BearedToken

    })

    return headersWithAuth
}