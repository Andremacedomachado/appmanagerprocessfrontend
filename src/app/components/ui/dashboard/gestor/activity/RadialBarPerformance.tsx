'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Theme } from '@nivo/core'
import { categoricalColorSchemes } from '@nivo/colors'
import {
    RadialBar,
    RadialBarSvgProps,
    RadialBarCustomLayerProps,
    svgDefaultProps,
    RadialBarTooltipComponent,
} from '@nivo/radial-bar'
import { MenuFilterDateRange } from './MenuFilterDateRange'
import { IActivityProps, STATUSACTIVITY } from '@/app/types/entities/Activity'
import { isAfter, isBefore } from 'date-fns'


interface CategoryGroup extends Record<string, string> {
    "Total": string,
    "Atrasadas": string,
    "Realizadas": string,
    "Sem data final": string,
    "Em aberto": string
}

type KeysCategoryGroup = Array<keyof CategoryGroup>;

const CustomToolTip: RadialBarTooltipComponent = ({ bar: { value, groupId, color } }) => (
    <div className='bg-white rounded-md broder border-slate-100 shadow-md px-1 '>
        <text style={{ color }}>

            {groupId}: <span className='font-semibold text-black'>{value}</span>
        </text>
    </div>
)







export interface RadiaLBarPerformanceProps {
    data: IActivityProps[],
    size?: number,
    options?: RadialBarSvgProps,
    dateFrom?: Date,
    dateTo?: Date,
    isValidRange: boolean
}

export const RadiaLBarPerformance = ({ data, size = 500, options, dateFrom, dateTo, isValidRange }: RadiaLBarPerformanceProps) => {

    const colorByGroupId: CategoryGroup = {
        "Em aberto": "#FFD23F",
        "Atrasadas": "#E83151",
        "Realizadas": '#40C463',
        "Sem data final": '#c3c3c3',
        "Total": "#8D92FF",
    }
    const customOptions: RadialBarSvgProps = {
        height: 250,
        width: 500,
        data: [],
        colors: d => colorByGroupId[d.groupId as keyof typeof colorByGroupId],
        tooltip: CustomToolTip,
        startAngle: 270,
        endAngle: 450,
        innerRadius: 0.1,
        enableCircularGrid: false,
        enableTracks: false,
        enableRadialGrid: false,

        circularAxisOuter: null,
        cornerRadius: 6,
        maxValue: 100,
        enableLabels: true,
        theme: {
            labels: {
                text: {
                    color: '#FB923C'
                },
            }
        },
        legends: [{
            anchor: 'top-right',
            itemHeight: 20,
            itemWidth: 60,
            itemsSpacing: 2,
            direction: 'column',
            padding: 1,
            toggleSerie: true,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: "#FB923C",
                        symbolSize: 20

                    },
                },
            ],
            symbolShape: 'circle',

            data: [{
                id: 1,
                label: 'atr',
                hidden: false
            }]


        }],
        margin: {
            top: 30,
            left: 30,
            right: 60,
            bottom: 30
        },
        layers: ['bars', 'labels', 'grid', 'legends'],
        animate: true,
        radialAxisStart: {
            tickRotation: 30,
            tickSize: 10,
        },
        isInteractive: true,

    }

    const handleFilterOnActivies = useCallback((activities: IActivityProps[], isValidRange: boolean, dateFrom?: Date, dateTo?: Date) => {
        var dateInitial: Date, dateFinally: Date;
        if (!isValidRange || !dateFrom || !dateTo) {
            const dateFirstCreated = activities.reduce((prev, activity) => {
                if (activity.created_at && isBefore(activity.created_at, prev)) {
                    return activity.created_at
                }
                else {
                    return prev
                }
            }, new Date())
            const dateLastedCreated = activities.reduce((prev, activity) => {
                if (activity.created_at && isAfter(activity.created_at, prev)) {
                    return activity.created_at
                }
                else {
                    return prev
                }
            }, new Date())
            dateInitial = dateFirstCreated;
            dateFinally = dateLastedCreated;
        }
        else {
            dateInitial = dateFrom;
            dateFinally = dateTo
        }

        return activities.filter(act => {
            return (
                act.created_at &&
                (isBefore(new Date(act.created_at), dateFinally)) &&
                (isAfter(new Date(act.created_at), dateInitial))
            )
        })
    }, [])

    const getPerformanceData = (activity: IActivityProps[]) => {
        const totalActivityResponsible = activity
        const totalActivityDelayed = activity.filter(act => {
            const { progress_status, due_date, conclusion_date } = act

            if ((progress_status === STATUSACTIVITY.DO_TO) && (due_date && isAfter(new Date(), new Date(due_date)))) {
                return true
            }
            if ((progress_status === STATUSACTIVITY.CLOSED) && (due_date && conclusion_date && isAfter(new Date(conclusion_date), new Date(due_date)))) {
                return true
            }

            return false
        })
        const totalActivityPending = activity.filter(act => (act.progress_status === STATUSACTIVITY.DO_TO && act.due_date && isAfter(new Date(act.due_date), new Date())))
        const totalActivityWithoutDueDate = activity.filter(act => !act.due_date)
        const totalActivityClosed = activity.filter(act => {
            console.log(
                act.start_date,
                act.due_date,
                act.conclusion_date,
                act.progress_status,
                '\n result:',
                act.progress_status === STATUSACTIVITY.CLOSED && act.due_date && act.conclusion_date && (isBefore(new Date(act.conclusion_date), new Date(act.due_date)))
            )
            return act.progress_status === STATUSACTIVITY.CLOSED && act.due_date && act.conclusion_date && (isBefore(new Date(act.conclusion_date), new Date(act.due_date)))
        })
        const totalActivity = activity

        return {
            totalActivity,
            totalActivityResponsible,
            totalActivityDelayed,
            totalActivityPending,
            totalActivityWithoutDueDate,
            totalActivityClosed
        }
    }
    const activitiesFiltedRangeDate = handleFilterOnActivies(data, isValidRange, dateFrom, dateTo)
    const dataProjection = getPerformanceData(activitiesFiltedRangeDate);
    const dataShowProgretion: RadialBarSvgProps['data'] = [

        {
            id: 'Atrasadas',
            data: [
                {
                    x: 'Atrasada',
                    y: dataProjection.totalActivityDelayed.length,
                },
            ],
        },
        {
            id: 'Em aberto',
            data: [
                {
                    x: 'Em aberto',
                    y: dataProjection.totalActivityPending.length,
                },
            ],
        },
        {
            id: 'Realizadas',
            data: [
                {
                    x: 'Realizada',
                    y: dataProjection.totalActivityClosed.length,
                },

            ],
        },
        {
            id: 'Sem prazo final',
            data: [
                {
                    x: 'Sem prazo final',
                    y: dataProjection.totalActivityWithoutDueDate.length
                }
            ]
        },
        {
            id: 'Total',
            data: [
                {
                    x: 'Total de Atividades',
                    y: dataProjection.totalActivity.length,
                },
            ],
        },

    ]
    const sizeH = size / 2;
    const sizeW = size
    return (

        <div className='flex flex-col items-center '>
            <RadialBar  {...customOptions} maxValue={dataProjection.totalActivity.length} data={dataShowProgretion} width={sizeW} height={sizeH} tracksColor="rgba(251, 146, 60, 0)" motionConfig="slow" />
        </div>
    )
}