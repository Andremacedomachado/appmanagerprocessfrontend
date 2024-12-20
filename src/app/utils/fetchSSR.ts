import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import verify from "@/app/lib/auth/authenticatedUtilsSSR";
import { verifyAuthRequest } from "../../../auth";

export type IMethodFetch =
    'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface IFecthWrapperSSRProps {
    method: IMethodFetch,
    input: RequestInfo | URL,
    body?: Object
}

export async function fetchWrapperSSR<T = any, E = any>({ method, input, body }: IFecthWrapperSSRProps) {
    try {
        const headerAuth = await verify.checkAuthenticatedOnRequest()

        const data = await fetch(input, {
            method,
            headers: headerAuth,
            body: body ? JSON.stringify(body) : undefined,
            cache: 'force-cache',
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

export function getUrlBackEnd() {
    return process.env.URL_API ? process.env.URL_API : "http://localhost:3000"
}

export interface ErrorResponse extends Array<{
    message: string,
    stack?: string,
    status?: number
}> { }
export interface FethSSRResponse<T> {
    success: boolean,
    data?: T,
    errors?: ErrorResponse
}
export async function fetchSSR<T = any>({ method, input, body }: IFecthWrapperSSRProps): Promise<FethSSRResponse<T>> {
    noStore()
    try {
        const headers = await verifyAuthRequest()
        const response = await fetch(input, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers
        })
        console.log('Request', method, response.url, response.status)
        if (response.status == 204 && response.ok) {
            return {
                success: true,
                data: undefined
            }
        }
        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: data as T,
            }
        }

        return {
            success: false,
            errors: [
                {
                    message: ' Error alegated backend'
                },
                {
                    message: JSON.stringify(data),
                    status: response.status
                }
            ]
        }
    } catch (error) {

        if (error instanceof Error) {
            return {
                success: false,
                errors: [{ message: error.message, stack: error.stack }]
            }
        }
        return {
            success: false,
            errors: [{ message: 'Error inesperado ' }]
        }
    }

}

