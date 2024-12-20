import { IUseFilterDateRange, useFilterDateRange } from "@/app/hooks/useFilterDateRange"
import { MenuFilterDateRange } from "./MenuFilterDateRange"
import { ShowErrorFilterDateRange } from "./ShowErrorFilterDateRange"

export interface FilterDateRangeProps extends IUseFilterDateRange {
    children: React.ReactNode
}

export const FilterDateRange = ({ children, dateTo, dateFrom, handlerActualMonthFilter, handlerActualYearFilter, handlerChangeDateFrom, handlerChangeDateTo, error, errorDateFrom, errorDateTo }: FilterDateRangeProps) => {
    return (
        <div className="flex flex-col shadow-md border border-slate-100 rounded-md [&>*]:p-2">
            <MenuFilterDateRange
                dateTo={dateTo}
                dateFrom={dateFrom}
                handlerActualMonthFilter={handlerActualMonthFilter}
                handlerActualYearFilter={handlerActualYearFilter}
                handlerChangeDateFrom={handlerChangeDateFrom}
                handlerChangeDateTo={handlerChangeDateTo}
                error={error}
                errorDateFrom={errorDateFrom}
                errorDateTo={errorDateTo}
            />
            <div className="flex flex-1 justify-center items-center">
                {children}
            </div>
            <ShowErrorFilterDateRange
                error={error}
                errorDateTo={errorDateFrom}
                errorDateFrom={error}
            />
        </div>
    )
}