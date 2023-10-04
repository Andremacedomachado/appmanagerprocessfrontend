
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest, req: NextRequest) {
    try {
        console.log('request', req)
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'unautorize' })
        }

        const token = session.user.access_token
        const bearer = 'Bearer ' + token;

        const url = new URL(`${process.env.NEXT_URL_API}/collectionActivityTree`)
        url.searchParams.set('userId', session.user.id)
        const data = await fetch(url, {
            method: 'GET',
            referrerPolicy: "same-origin",
            headers: {
                "Authorization": bearer,
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json()
        })
            .catch(error => {
                console.log('Error de requisição', error)
                return error
            })
        return NextResponse.json(data)

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: 'unexpected test', typeError: error })
    }
}