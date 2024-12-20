import { IUseFilterDateRange, useFilterDateRange } from "@/app/hooks/useFilterDateRange"
import { ButtonFilterPreSet } from "./ButtonFilterPreSet"
import { InputFilterDate } from "./InputFilterDate"

export interface MenuFilterDateRangeProps extends IUseFilterDateRange {
}

export const MenuFilterDateRange = ({
    dateFrom,
    dateTo,
    error,
    errorDateFrom,
    errorDateTo,
    handlerActualMonthFilter,
    handlerActualYearFilter,
    handlerChangeDateFrom,
    handlerChangeDateTo,
}: MenuFilterDateRangeProps) => {

    return (
        <div className="flex  justify-end p-2 border-b border-slate-200 gap-2">

            <ButtonFilterPreSet onClick={handlerActualYearFilter} label="Ano atual" />
            <ButtonFilterPreSet onClick={handlerActualMonthFilter} label="Mes atual" />
            <form action="" className="flex flex-row">
                <InputFilterDate
                    name="dateFrom"
                    id="dateFrom"
                    label="Data inicial"
                    onChange={handlerChangeDateFrom}
                    errors={[errorDateFrom, error]}
                    value={dateFrom} />
                <InputFilterDate
                    name="dateTo"
                    id="dateFrom"
                    label="Data final"
                    onChange={handlerChangeDateTo}
                    errors={[errorDateTo, error]}
                    value={dateTo} />
            </form>
        </div>
    )
}