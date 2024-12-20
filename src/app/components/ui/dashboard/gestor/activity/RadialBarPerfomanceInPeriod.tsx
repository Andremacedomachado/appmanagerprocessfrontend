'use client'

import { useFilterDateRange } from "@/app/hooks/useFilterDateRange"
import { FilterDateRange } from "./FilterDataRange"
import { RadiaLBarPerformance } from "./RadialBarPerformance"
import { IActivityProps } from "@/app/types/entities/Activity"


export interface RadialBarPerfomanceInPeriodProps {
    activities: IActivityProps[]
}

export const RadialBarPerfomanceInPeriod = ({ activities }: RadialBarPerfomanceInPeriodProps) => {
    const propsFilter = useFilterDateRange();
    const { dateFrom, dateTo, isValidRange } = propsFilter
    return (
        <FilterDateRange {...propsFilter}>
            <RadiaLBarPerformance data={activities} dateFrom={dateFrom} dateTo={dateTo} isValidRange={isValidRange} />
        </FilterDateRange>
    )
}