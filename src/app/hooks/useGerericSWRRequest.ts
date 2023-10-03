'use client'

import useSWR from "swr";

export type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

interface useGerericSWRRequestProps<ParamsType = unknown, TypeResponse = unknown> {
    endpoint: string,
    params?: Record<keyof ParamsType, any>,
    init: RequestInit,
}

const fetcher = async (url: RequestInfo, init: RequestInit) => {
    const data = fetch(url, init).then(res => res.json())
    return data
}
export default function useGerericSWRRequest<P = undefined, T = unknown>({ endpoint, init, params }: useGerericSWRRequestProps<P, T>) {
    const searchParams = params ? new URLSearchParams(params) : undefined
    const url = searchParams ? endpoint + searchParams.toString() : endpoint
    const { data, error, isLoading, isValidating, mutate } = useSWR<T, Error>([url, init], () => fetcher(url, init), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    })

    return { data, error, isLoading, isValidating, mutate }

}