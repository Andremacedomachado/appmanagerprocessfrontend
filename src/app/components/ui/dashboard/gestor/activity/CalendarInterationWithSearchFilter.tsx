'use client'

import { ChangeEvent, useCallback, useState } from "react";
import { InputFilterDate } from "./InputFilterDate";
import { ResponsiveCalendarInteration } from "./ResponsiveCalendarInteration";
import { endOfMonth, endOfYear, isAfter, isBefore, isValid, startOfMonth, startOfYear } from "date-fns";
import { ButtonFilterPreSet } from "./ButtonFilterPreSet";
import { useFilterDateRange } from "@/app/hooks/useFilterDateRange";
import { MenuFilterDateRange } from "./MenuFilterDateRange";
import { ShowErrorFilterDateRange } from "./ShowErrorFilterDateRange";
import { FilterDateRange } from "./FilterDataRange";
export interface CalendarInterationWithSearchFilterProps {
    data: { day: string; value: number; }[]
}

export function CalendarInterationWithSearchFilter({ data }: CalendarInterationWithSearchFilterProps) {
    const { dateFrom, dateTo, error, errorDateFrom, errorDateTo, handlerActualMonthFilter, handlerActualYearFilter, handlerChangeDateFrom, handlerChangeDateTo } = useFilterDateRange()

    return (
        <FilterDateRange {...{ dateFrom, dateTo, error, errorDateFrom, errorDateTo, handlerActualMonthFilter, handlerActualYearFilter, handlerChangeDateFrom, handlerChangeDateTo }}>
            <ResponsiveCalendarInteration data={data} dateFrom={dateFrom} dateTo={dateTo} />
        </FilterDateRange>
    )
}