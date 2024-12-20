import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


export default async function checkAuthenticatedOnRequest() {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error('authorized')
    }
    const token = `Bearer ${session.user.access_token}`
    const header = new Headers()
    header.append('Content-Type', 'application/json')
    header.append('Authorization', token)

    return header
}