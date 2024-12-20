import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { ur } from "@faker-js/faker";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const endpoint = '/recordDependency'

const GetRecordRelationActivityAdjacentRequestSchema = z.object({
    activityId: z.string().uuid()
})

export async function GET(request: NextApiRequest) {
    try {

        const urlOrigin = request.url ? request.url : ''
        const url = PassSearchParamsBetweenRequest(urlOrigin, GetRecordRelationActivityAdjacentRequestSchema, endpoint);
        const responseData = await fetchWrapperSSR<IRecordDependencyProps[], Error>({
            method: 'GET',
            input: url
        })
        console.log("dados::", responseData)
        return NextResponse.json(responseData)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack })
        }
        return NextResponse.json({ error: { ...error as any } })
    }
}