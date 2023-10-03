import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { checkAuthenticatedOnRequest } from "@/lib/server/auth/authenticatedUtilsSSR";

export type IMethodFetch =
    'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IFecthWrapperSSRProps {
    method: IMethodFetch,
    input: RequestInfo | URL,
    body?: Object
}

export async function fetchWrapperSSR<T = any, E = any>({ method, input, body }: IFecthWrapperSSRProps) {
    try {
        const headerAuth = await checkAuthenticatedOnRequest()
        const data = await fetch(input, {
            method,
            headers: headerAuth,
            body: body ? JSON.stringify(body) : undefined
        }).then((res) => {
            return res.json();
        })
        return data as T
    } catch (error: any) {
        if (error instanceof Error) {
            throw error
        }
        throw error as E
    }
}

export async function fetchSimpleSSR<T = any, E = any>({ method, input, body }: IFecthWrapperSSRProps) {

    const data = await fetch(input, {
        method,
        body: body ? JSON.stringify(body) : undefined
    }).then((res) => {
        return res.json();
    })
    return data as any as T

}


export interface ParsePayloadToSearchParamsProps<T> {
    data: T,
    urlBase: string
}

export function parsePayloadToSearchParams<T extends Record<string, string>>({ data, urlBase }: ParsePayloadToSearchParamsProps<T>) {
    const searchParams = new URLSearchParams(data)
    return new URL(`${urlBase}?${searchParams.toString()}`)
}