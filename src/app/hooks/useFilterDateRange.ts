import { endOfMonth, endOfYear, isAfter, isBefore, isValid, startOfMonth, startOfYear } from "date-fns"
import { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from "react"

export interface IStateRangeFilterDateRange {
    dateFrom?: Date,
    dateTo?: Date,
    isValidRange: boolean
}

export interface IStateErrorFilterDateRange {
    error?: string,
    errorDateFrom?: string,
    errorDateTo?: string
}

export interface IHandlesFilterDateRange {
    handlerChangeDateFrom: (e: ChangeEvent<HTMLInputElement>) => void,
    handlerChangeDateTo: (e: ChangeEvent<HTMLInputElement>) => void,
    handlerActualMonthFilter: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handlerActualYearFilter: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export interface IUseFilterDateRange extends IStateRangeFilterDateRange, IStateErrorFilterDateRange, IHandlesFilterDateRange {
}

export function useFilterDateRange() {
    const [dateFrom, setDateFrom] = useState<Date | undefined>()
    const [dateTo, setDateTo] = useState<Date | undefined>()
    const [isValidRange, setIsValidRange] = useState<boolean>(false)
    const [errorDateFrom, setErrorDateFrom] = useState<string | undefined>()
    const [errorDateTo, setErrorDateTo] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const handlerChangeDateFrom = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        var dateParsed: Date | undefined;
        if (isValid(new Date(e.currentTarget.value))) {
            const dateInput = new Date(e.currentTarget.value);
            dateParsed = new Date(dateInput.valueOf() + dateInput.getTimezoneOffset() * 60 * 1000)
            setErrorDateFrom(undefined)
            setDateFrom(dateParsed)
        }
        else {
            setErrorDateFrom('A data inicial é invalida!')
        }

        if (dateParsed && dateTo) {
            if (isAfter(dateTo, dateParsed) || (dateTo === dateParsed)) {
                setError(undefined)
                setDateTo(dateParsed)
            }
            else {
                setError('A data final dever ser posterior a inicial!')
            }
        }
    }, [dateTo])

    const handlerChangeDateTo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        var dateParsed: Date | undefined;
        if (isValid(new Date(e.currentTarget.value))) {
            const dateInput = new Date(e.currentTarget.value);
            dateParsed = new Date(dateInput.valueOf() + dateInput.getTimezoneOffset() * 60 * 1000)
            setErrorDateTo(undefined)
            setDateTo(dateParsed)
        }
        else {
            setError('A data é invalida!')
        }
        if (dateParsed && dateFrom) {

            if (isBefore(dateFrom, dateParsed)) {
                setError(undefined)
                setDateTo(dateParsed)
            }
            else {
                setError('A data final dever ser posterior a inicial!')
            }
        }
    }, [dateFrom])


    const handlerActualMonthFilter = useCallback(() => {
        const dateNow = new Date()
        const dateEndMonth = endOfMonth(dateNow)
        const dateStartMonth = startOfMonth(dateNow)
        setDateFrom(dateStartMonth)
        setDateTo(dateEndMonth)
    }, [])

    const handlerActualYearFilter = useCallback(() => {
        const dateNow = new Date()
        const dateEndMonth = endOfYear(dateNow)
        const dateStartMonth = startOfYear(dateNow)
        setDateFrom(dateStartMonth)
        setDateTo(dateEndMonth)
    }, [])

    useEffect(() => {
        if (dateFrom && dateTo && isBefore(dateFrom, dateTo)) {
            setIsValidRange(true)
        }
        else {
            setIsValidRange(false)
        }
    }, [dateFrom, dateTo])

    return {
        dateFrom,
        dateTo,
        errorDateFrom,
        errorDateTo,
        error,
        isValidRange,
        handlerChangeDateFrom,
        handlerChangeDateTo,
        handlerActualMonthFilter,
        handlerActualYearFilter
    } as IUseFilterDateRange
};