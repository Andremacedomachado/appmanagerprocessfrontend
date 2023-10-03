'use client'
export async function fetchWrapper<T = unknown>(input: RequestInfo | URL, init?: RequestInit) {
    const data = await fetch(`${input}`, init).then(res => res.json())

    return data as T;
}