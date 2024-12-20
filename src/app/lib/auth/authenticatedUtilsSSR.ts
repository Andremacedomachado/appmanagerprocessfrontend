import { auth } from "../../../../auth"


async function checkAuthenticatedOnRequest() {
    const session = await auth()
    if (!session) {
        throw new Error('authorized')
    }
    const token = `Bearer ${session.user.access_token}`
    const header = new Headers()
    header.append('Content-Type', 'application/json')
    header.append('Authorization', token)

    return header
}

const fn = {
    checkAuthenticatedOnRequest
}
export default fn