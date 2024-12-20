'use client'
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import ButtonCircleOption from "./ButtonCircleOption";
import MenuCalendar from "./MenuCalendar";
import { format, parseISO } from "date-fns";
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils";
import { IActivityProps } from "@/app/types/entities/Activity";
import { StateActivity } from "@/app/lib/schemas";
import { updateActivity, updateActivityWithNullDate } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import useToggle from "@/app/hooks/utils/useToggle";
import { useCallback, useEffect, useState } from "react";

interface MenuActionRecordEventProps {
    activity: IActivityProps,
    userIdCurrent: string
}

const MenuActionRecordEvent: React.FC<MenuActionRecordEventProps> = ({ activity, userIdCurrent }) => {
    const [dateFinally, setDateFinally] = useState<Date | undefined>()

    const initialValue: StateActivity = { message: null, errors: {} }
    const updatedActivityWithParameters = updateActivity.bind(null, activity.id).bind(null, userIdCurrent)
    const [state, dispatch] = useFormState(updatedActivityWithParameters, initialValue)

    useEffect(() => {
        setDateFinally(activity.due_date ? activity.due_date : undefined)
    }, [activity.due_date])
    const handlerClearDateFinally = useCallback(() => {
        updateActivityWithNullDate(activity.id, userIdCurrent, 'due_date')
        setDateFinally(undefined)
    }, [activity.id, userIdCurrent])
    return (
        <div className="flex justify-center items-center divide-x-2 py-1">
            <div className="flex flex-col px-2 text-xs font-semibold  ">
                <span className=" text-slate-400">
                    CRIADO
                </span>
                <span>
                    {activity?.created_at ? parseDateToMaskDate(activity.created_at) : undefined}
                </span>
            </div>
            <div className="flex gap-2  px-2 text-xs font-semibold">
                {
                    dateFinally &&
                    <div className={`flex flex-col justify-center items-baseline`}>
                        <span className="text-slate-400">
                            DATA FINAL
                        </span>
                        <span className="flex gap-1 justify-start items-baseline  ">
                            <AiFillCloseCircle size={10} className="hover:text-orange-600 transition" onClick={handlerClearDateFinally} />
                            {parseDateToMaskDate(dateFinally)}
                        </span>
                    </div>
                }



                <div className={'flex'}>

                    <ButtonCircleOption
                        icon={BsCalendar2Check}
                        onClick={(e) => { }}
                        message="Data Final"
                        menuNode={<MenuCalendar
                            defaultValue={activity.due_date ? activity.due_date : undefined}
                            dispatch={dispatch}
                            handlerOnSubmit={() => { }}
                        />}
                    />
                </div>
            </div>

        </div>
    );
}

export default MenuActionRecordEvent;