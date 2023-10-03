
'use client'
import useGerericSWRRequest from "../useGerericSWRRequest"
import { IActivityProps } from '../../types/entities/Activity'
interface useActivityByIdProps {
    activityId: string
}

const endpoint = '/api/userSimple/getInfoActivity?'
export default function useActivityById({ activityId }: useActivityByIdProps) {
    return useGerericSWRRequest<useActivityByIdProps, IActivityProps>({
        endpoint: endpoint,
        init: { method: 'GET' },
        params: { activityId: activityId }
    })
}

