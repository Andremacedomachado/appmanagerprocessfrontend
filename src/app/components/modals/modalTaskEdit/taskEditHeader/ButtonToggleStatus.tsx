"use client"
import MessageInfoContent from "@/app/components/popover/MessageInfoContent";
import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import { STATUSACTIVITY } from "@/app/types/entities/Activity";
import { useCallback, useState } from "react";
import { HiCheck } from "react-icons/hi";

const ButtonToggleStatus = () => {
    const { data, mutate } = useActivityById({ activityId: 'e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74' })
    const [check, setCheck] = useState(data?.progress_status == STATUSACTIVITY.DO_TO ? false : true)
    const ToggleCheck = useCallback(() => {
        console.log('click status');

        if (data) {
            if (data.progress_status == STATUSACTIVITY.DO_TO) {
                console.log('para fazer:', check);
                console.log(data.progress_status)
                setCheck(false)
                mutate({ ...data, progress_status: STATUSACTIVITY.CLOSED }, false)
            }
            else {
                console.log('Terminou:', check);
                setCheck(true)
                mutate({ ...data, progress_status: STATUSACTIVITY.DO_TO }, false)
            }
        }
    }, [check, data, mutate])
    return (
        <MessageInfoContent
            message="Alterar status da tarefa"
            trigger={
                <div
                    onClick={ToggleCheck}
                    className={`
                    flex 
                    flex-row 
                    items-baseline 
                    px-2 
                    rounded-md 
                    ${check ? 'text-white bg-green-600' : 'text-green-600 border-2 bg-transparent border-green-600   '}
                    transition`}
                >
                    <HiCheck />
                    {!check && <span>Marcar completa</span>}
                    {check && <span>Concluida</span>}
                </div>

            }
        />

    );
}

export default ButtonToggleStatus;