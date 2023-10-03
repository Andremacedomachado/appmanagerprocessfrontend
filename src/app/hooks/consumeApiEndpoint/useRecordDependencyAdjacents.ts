'use client'
import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import useGerericSWRRequest from "../useGerericSWRRequest";

interface useRecordDependencyAdjacentsProps {
    activityId: string
}

const endpoint = '/api/userSimple/getRecordRelationActivityAdjacent?'

export function useRecordDependencyAdjacents(params: useRecordDependencyAdjacentsProps) {
    return useGerericSWRRequest<useRecordDependencyAdjacentsProps, IRecordDependencyProps[]>({
        init: { method: 'GET' },
        endpoint,
        params
    })
}