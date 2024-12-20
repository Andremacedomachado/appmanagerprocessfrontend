import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";


const endpoint = '/annexActivity/activityId?'

const GetAnnexInfoByActivityIdRequestSchema = z.object({
    activityId: z.string().uuid(),
})

export async function GET(request: NextApiRequest) {
    try {
        const urlOrigin = request.url ? request.url : ''
        const urlBackend = PassSearchParamsBetweenRequest(urlOrigin, GetAnnexInfoByActivityIdRequestSchema, endpoint)

        const responseData = await fetchWrapperSSR<IAnnexActivityProps[]>({
            method: 'GET',
            input: urlBackend
        })

        return NextResponse.json(responseData)

    } catch (error) {

    }
}