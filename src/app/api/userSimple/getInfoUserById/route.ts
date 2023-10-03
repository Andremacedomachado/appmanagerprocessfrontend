import { UserInfo } from "@/app/types/UserInfo";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const endpoint = '/user?';

const GetInfoUserSchemaRequest = z.object({
    userId: z.string().uuid()
})
export async function GET(request: NextApiRequest) {
    try {
        const urlBackend = PassSearchParamsBetweenRequest(request, GetInfoUserSchemaRequest, endpoint)
        const dataResponse = await fetchWrapperSSR<UserInfo, Error>({
            method: 'GET',
            input: urlBackend,
        })
        return NextResponse.json(dataResponse)
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack })
        }
        return NextResponse.json({ error: { ...error as any } })
    }
}