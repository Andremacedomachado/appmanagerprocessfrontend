
'use client'
import useGerericSWRRequest from "../useGerericSWRRequest"
import { IActivityProps } from '../../types/entities/Activity'
import { IMessageActivityProps } from "@/app/types/entities/MessageActivity"
interface useMessageByActivityIdProps {
    activityId: string
}

const endpoint = '/api/userSimple/getMessageInActivity?'
export default function useMessageByActivityId({ activityId }: useMessageByActivityIdProps) {
    return useGerericSWRRequest<useMessageByActivityIdProps, IMessageActivityProps[]>({
        endpoint: endpoint,
        method: 'GET',
        params: { activityId: activityId }
    })
}