import { SessionLoginResponseBackend } from "@/app/types/entities/Session";
import axios, { AxiosResponse } from "axios";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { Session, User } from "next-auth/core/types";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 10 * 60
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            type: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                const data = credentials as {
                    email: string;
                    password: string;
                };
                const res = await fetch(process.env.URL_API + "/login", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });

                const user: SessionLoginResponseBackend = await res.json();
                if (res.ok && user) {
                    const userInFormat: User = {
                        ...user.user,
                        access_token: user.token
                    }
                    return userInFormat;
                }
                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user, session, account }) => {
            if (user) {
                token.user = user,
                    session = user
            }


            return token;
        },
        session: async ({ session, token, user }) => {
            if (token) {
                user = token.user;
                session.user = user
            }


            return session
        },

    },
    pages: {
        signIn: '/',
    },

    secret: process.env.NEXTAUTH_SECRET,

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

