'use client'

import { ActivityUpdateByIdProps } from "@/app/api/userSimple/updateActivity/route";
import { IActivityProps } from "@/app/types/entities/Activity";
import { fetchWrapper } from "@/app/utils/fetch";

interface UpdateActivityByIdRequestClientProps extends ActivityUpdateByIdProps { }

interface UpdateActivity extends Exclude<UpdateActivityByIdRequestClientProps, null | undefined> { }


export async function updateActivityByIdRequestClient(dataUpdate: UpdateActivityByIdRequestClientProps) {
    try {
        const data = Object.fromEntries(Object.entries(dataUpdate).filter(([_, v]) => v != null))
        const bodyContent = JSON.stringify(data)
        const response = await fetchWrapper<IActivityProps>('/api/userSimple/updateActivity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bodyContent
        })

        return response
    } catch (error) {
        throw new Error('Error em atualização client trigger')
    }
}