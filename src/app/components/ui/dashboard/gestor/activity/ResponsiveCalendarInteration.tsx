
'use client'

import { CalendarDatum, CalendarTooltipProps, ResponsiveCalendar, ResponsiveTimeRange, TimeRange, TimeRangeSvgProps, computeCellSize } from "@nivo/calendar"
import { TimeRangeCustom } from "./TimeRangeCustom"

import { addDays, differenceInMonths, format, getYear, isBefore } from "date-fns"
import { FC } from "react"

export interface ResponsiveCalendarInterationProps {
    data: CalendarDatum[], size?: number, dateFrom?: Date, dateTo?: Date
}

export function ResponsiveCalendarInteration({ data, size = 500, dateFrom: dF, dateTo: dT }: ResponsiveCalendarInterationProps) {
    const defaultLegendCustom = (value: number) => {

        const labelCategory: { label: string, point: number }[] = [
            { label: 'pouca atividade', point: 0 },
            { label: 'razoavel atividade', point: 3 },
            { label: 'normal atividade', point: 10 },
            { label: 'muita atividade', point: 15 },
            { label: 'bastante atividade', point: 20 }
        ]
        const matchCategory = labelCategory.find((category, i, array) => {
            if (i == array.length - 1) {
                return true
            }
            if (value >= category.point && value < array[i + 1].point) {
                return true
            }
            return false
        })
        return matchCategory?.label + ''
    }

    const DefaultTooltipLabels: FC<CalendarTooltipProps> = ({ color, day, value }) => {
        const dataParsed = format(new Date(day), 'dd/MM/yyyy')
        return (
            <div className="font-sans p-1 rounded-md bg-white border border-slate-200">{dataParsed}:  {<span className={`font-semibold`} style={{ color }}>{value}</span>} interações</div>
        )
    }

    const sizeW = size;
    const sizeH = size / 3;
    const padding = 2;
    const dateFrom = dF ? dF : new Date(` ${getYear(new Date())}-01-01`)
    const dateTo = dT ? dT : new Date()
    const diffMonth = differenceInMonths(dateTo, dateFrom)
    const propsDefaultCustom: TimeRangeSvgProps = {
        data,
        height: sizeH,
        width: sizeW,
        from: dateFrom,
        to: isBefore(dateFrom, dateTo) ? dateTo : addDays(dateFrom, 1),
        emptyColor: "#eeeeee",
        colors: ['#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dayRadius: 5,
        margin: {
            bottom: 30,
            left: 0,
            right: 0,
            top: 30
        },
        square: true,
        legendFormat: defaultLegendCustom,
        tooltip: DefaultTooltipLabels,
        legends: [
            {
                anchor: 'bottom',
                direction: 'row',
                itemCount: 2,
                itemWidth: 42,
                itemHeight: 30,
                itemsSpacing: 100,
                translateX: 0,
                translateY: 0,
                padding,
            },
        ],
        weekdayTicks: [1, 3, 5]
    }
    return (
        <TimeRangeCustom
            {...propsDefaultCustom}
        />
    )

}