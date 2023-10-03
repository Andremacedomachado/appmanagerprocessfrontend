'use client'

import { z } from "zod"
import useGerericSWRRequest from "../useGerericSWRRequest"
import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity"


const endpoint = '/api/userSimple/getAnnexInfoByActivityId?'

const UseAnnexByActivityIdRequestSchema = z.object({
    activityId: z.string().uuid()
})

type UseAnnexByActivityIdRequestType = z.infer<typeof UseAnnexByActivityIdRequestSchema>

export function useAnnexByActivityId({ activityId }: UseAnnexByActivityIdRequestType) {
    return useGerericSWRRequest<UseAnnexByActivityIdRequestType, IAnnexActivityProps[]>({
        method: "GET",
        endpoint,
        params: { activityId }
    })
}
