'use client'

import { UserInfo } from "@/app/types/UserInfo"
import useGerericSWRRequest from "../useGerericSWRRequest"

interface useUserInfoByIdProps {
    userId: string
}

const endpoint = '/api/userSimple/user?'

export default function useUserInfoById({ userId }: useUserInfoByIdProps) {
    return useGerericSWRRequest<useUserInfoByIdProps, UserInfo>({
        endpoint,
        init: { method: 'GET' },
        params: { userId: userId }
    });
}
