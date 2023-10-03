'use client'

import useSWR from 'swr';
import { CollectionActivityTree } from '../types/CollectionActivityTree';

useActivityByUser.auth = {}
export default function useActivityByUser() {


    const fetcher = async (url: RequestInfo) => {
        const data = await fetch(url).then(res => res.json())
        return data
    }
    const { data, error, isLoading, isValidating, mutate } = useSWR<CollectionActivityTree>(['/actions/activityByUser'], fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: false,
    })

    return { data, error, isLoading, isValidating, mutate }

}