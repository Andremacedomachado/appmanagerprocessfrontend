'use client'

import { ChangeEvent, useCallback, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import ButtonCircleOption from "./ButtonCircleOption";
import MenuCalendar from "./MenuCalendar";
import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import { format, parseISO } from "date-fns";

interface MenuActionRecordEventProps {
    startDate?: Date,
    dueDate?: Date | null
}

const MenuActionRecordEvent: React.FC<MenuActionRecordEventProps> = ({ dueDate, startDate }) => {
    const { data: activityInfo, mutate } = useActivityById({ activityId: 'e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74' })

    const handlePushDateFinally = useCallback(async (value: Date) => {

        if (activityInfo) {
            await mutate({ ...activityInfo, due_date: value }, false)
        }


    }, [activityInfo, mutate])
    const handleCleanDate = useCallback(() => {
        if (activityInfo) {
            mutate({ ...activityInfo, due_date: undefined }, false)
        }

    }, [mutate, activityInfo])
    return (
        <div className="flex justify-start items-center divide-x-2 ">
            <div className="flex flex-col px-2 text-xs font-semibold  " onClick={() => { console.log(activityInfo?.start_date) }
            }>
                <span className=" text-slate-400">
                    CRIADO
                </span>
                <span>
                    {activityInfo?.start_date ? format(parseISO(activityInfo.start_date.toString()), 'dd-MM-yyyy') : undefined}
                </span>
            </div>
            <div className="flex flex-col px-2 text-xs font-semibold">
                {activityInfo?.due_date && <>

                    <span className="text-slate-400">
                        DATA FINAL
                    </span>

                    <span className="flex gap-1 justify-start items-baseline ">
                        <AiFillCloseCircle size={10} onClick={handleCleanDate} className="hover:text-orange-600 transition" />
                        {format(activityInfo.due_date, 'dd-MM-yyyy')}
                    </span>
                </>
                }

                {!activityInfo?.due_date &&
                    <ButtonCircleOption
                        icon={BsCalendar2Check}
                        onClick={(e) => { e.preventDefault }}
                        message="Data Final"
                        menuNode={<MenuCalendar
                            setState={handlePushDateFinally}
                        />}
                    />
                }
            </div>

        </div>
    );
}

export default MenuActionRecordEvent;