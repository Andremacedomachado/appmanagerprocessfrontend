import { NextApiRequest } from "next"
import { NextRequest } from "next/server"
import { ZodType, z } from "zod"

export default function PassSearchParamsBetweenRequest<T extends ZodType>(req: NextApiRequest, schema: T, endPointResource: string) {
    if (!req.url) {
        throw new Error("Error url client to serve front miss")
    }
    const payloadClient = Object.fromEntries(new URL(req.url).searchParams)
    const dataValidParams = schema.parse(payloadClient)
    const searchParams = new URLSearchParams(dataValidParams)
    const urlBackendwithQuery = new URL(process.env.NEXT_URL_API + endPointResource + searchParams.toString())

    return urlBackendwithQuery;
}