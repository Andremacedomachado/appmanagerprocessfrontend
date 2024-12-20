'use client'

import { UserInfo } from "../types/UserInfo"
import useGerericSWRRequest from "./useGerericSWRRequest"

export interface UseCollaboratorsRecentsProps {
    userId: string
}

const endPointResource = 'http://localhost:8080/api/userSimple/getInfoCollaboratorRecentsAllActivity?'

export function useCollaboratorsRecents({ userId }: UseCollaboratorsRecentsProps) {
    return useGerericSWRRequest<UseCollaboratorsRecentsProps, UserInfo[]>({
        endpoint: endPointResource,
        init: {
            method: 'GET'
        },
        params: { userId: userId }
    })
}

const api = {
    useCollaboratorsRecents
}
export default api;