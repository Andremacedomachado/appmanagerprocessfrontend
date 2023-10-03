import { ActivityInfo } from "@/app/types/CollectionActivityTree";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";


const endPointResource = '/activity/id?'

const GetInfoActivityRequestSchema = z.object({
    activityId: z.string().uuid()
})

export async function GET(req: NextApiRequest) {
    try {
        const urlBackend = PassSearchParamsBetweenRequest(req, GetInfoActivityRequestSchema, endPointResource)
        const dataReponse = await fetchWrapperSSR<ActivityInfo>(
            {
                method: 'GET',
                input: urlBackend.href
            })

        return NextResponse.json(dataReponse)


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack })
        }
        return NextResponse.json({ error: { ...error as any } })
    }
}