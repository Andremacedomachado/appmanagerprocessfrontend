'use client'
import { CalendarMonthLegendsProps } from '@nivo/calendar'
import { memo } from 'react'

// eslint-disable-next-line react/display-name
export const CalendarMonthLegendsCustom = memo(({ months, legend, theme }: CalendarMonthLegendsProps) => {
    return (
        <>
            {months.map(month => {
                return (
                    <text
                        key={`${month.date.toString()}.legend`}
                        transform={`translate(${month.x},${month.y}) rotate(${month.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(month.year, month.month, month.date)}
                    </text>
                )
            })}
        </>
    )
})