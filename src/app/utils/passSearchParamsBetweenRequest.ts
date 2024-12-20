import { ZodType } from "zod"

export default function PassSearchParamsBetweenRequest<T extends ZodType>(urlOrigin: string, schema: T, endPointResource: string) {

    const payloadClient = Object.fromEntries(new URL(urlOrigin).searchParams)
    const dataValidParams = schema.parse(payloadClient)
    const searchParams = new URLSearchParams(dataValidParams)
    const urlBackendwithQuery = new URL(process.env.NEXT_URL_API + endPointResource + '?' + searchParams.toString())

    return urlBackendwithQuery;
}