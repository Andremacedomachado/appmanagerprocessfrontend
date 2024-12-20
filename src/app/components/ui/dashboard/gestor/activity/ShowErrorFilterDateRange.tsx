export interface ShowErorFilterDateRangeProps {
    error?: string,
    errorDateFrom?: string,
    errorDateTo?: string
}

export const ShowErrorFilterDateRange = ({ error, errorDateFrom, errorDateTo }: ShowErorFilterDateRangeProps) => {
    return (
        <div className="border-t border-slate-200 h-10  overflow-hidden">
            {errorDateFrom && <p className="text-red-400 font-semibold" >{errorDateFrom}</p>}
            {errorDateTo && <p className="text-red-400 font-semibold" >{errorDateTo}</p>}
            {error && <p className="text-red-400 font-semibold" >{error}</p>}
        </div>
    )

}