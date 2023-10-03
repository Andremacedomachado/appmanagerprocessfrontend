import { UserInfo } from "@/app/types/UserInfo";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const endPoint = '/user?'

const GetUserRequstSchema = z.object({
    userId: z.string().uuid()
})

export async function GET(req: NextRequest) {
    try {
        const url = PassSearchParamsBetweenRequest(req, GetUserRequstSchema, endPoint)
        const responseApi = await fetch(url, {
            method: 'GET',
            headers: req.headers
        });
        const data = await responseApi.json()


        if (!responseApi.ok) {
            return NextResponse.json(data, { status: responseApi.status })
        }


        return NextResponse.json(data);
    } catch (error: any) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack }, { status: 400 })
        }
        return NextResponse.json({ error: { ...error as any } })
    }

}