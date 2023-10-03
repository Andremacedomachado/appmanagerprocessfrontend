'use client'

import { useSession } from "next-auth/react"

export async function useCheckAuthenticatedOnRequest() {
    const session = useSession()
    if (!session) {
        throw new Error('authorized')
    }
    const token = `Bearer ${session.data?.user.access_token}`
    const header = new Headers()
    header.append('Content-Type', 'application/json')
    header.append('Authorization', token)


    console.log('mostra em ambos os render side ==', session, header.get('Authorization'))
    return header

}