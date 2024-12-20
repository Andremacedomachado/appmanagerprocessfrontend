import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const endpoint = '/messageActivity/activityId'

const GetMessageInActivitySchemaRequest = z.object({
    activityId: z.string().uuid()
})

export async function GET(request: NextApiRequest) {
    try {

        const urlOrigin = request.url ? request.url : ''
        const urlBackend = PassSearchParamsBetweenRequest(urlOrigin, GetMessageInActivitySchemaRequest, endpoint)

        const data = await fetchWrapperSSR({
            method: 'GET',
            input: urlBackend,
        })
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack })
        }
        return NextResponse.json({ error: { ...error as any } })
    }
} 