'use client'

import { UserInfo } from "../types/UserInfo"
import useGerericSWRRequest from "./useGerericSWRRequest"

interface UseCollaboratorsRecentsPros {
    userId: string
}

const endPointResource = 'http://localhost:8080/api/userSimple/getInfoCollaboratorRecentsAllActivity?'

export default function useCollaboratorsRecents({ userId }: UseCollaboratorsRecentsPros) {
    console.log('log passou pelo use Collaborators');

    return useGerericSWRRequest<UseCollaboratorsRecentsPros, UserInfo[]>({
        endpoint: endPointResource,
        init: {
            method: 'GET'
        },
        params: { userId: userId }
    })


}
