"use client"
import MessageInfoContent from "@/app/components/popover/MessageInfoContent";
import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import { updateActivity } from "@/app/lib/actions";
import { StateActivity } from "@/app/lib/schemas";
import { IActivityProps, STATUSACTIVITY } from "@/app/types/entities/Activity";
import { useCallback, useState } from "react";
import { useFormState } from "react-dom";
import { HiCheck } from "react-icons/hi";


export interface ButtonToggleStatusActivityProps {
    userId: string,
    activity: IActivityProps,
}
const ButtonToggleStatusActivity = ({ activity, userId }: ButtonToggleStatusActivityProps) => {
    const initialValue: StateActivity = { message: null, errors: {} }
    const updatedActivityWithParameters = updateActivity.bind(null, activity.id).bind(null, userId)
    const [state, dispatch] = useFormState(updatedActivityWithParameters, initialValue)
    const statusIsClosed = activity.progress_status === STATUSACTIVITY.CLOSED
    return (
        <MessageInfoContent
            message="Alterar status da tarefa"
            trigger={
                <form action={dispatch}>
                    <input type="hidden" name={'progress_status'} value={statusIsClosed ? STATUSACTIVITY.DO_TO : STATUSACTIVITY.CLOSED} />
                    <button

                        className={`
                    flex 
                    flex-row 
                    items-baseline 
                    px-2 
                    rounded-md 
                    ${statusIsClosed ? 'text-white bg-green-600' : 'text-green-600 border-2 bg-transparent border-green-600   '}
                    transition`}
                    >
                        <HiCheck />
                        {!statusIsClosed && <span>Marcar completa</span>}
                        {statusIsClosed && <span>Concluida</span>}
                    </button>
                </form>

            }
        />

    );
}

export default ButtonToggleStatusActivity;