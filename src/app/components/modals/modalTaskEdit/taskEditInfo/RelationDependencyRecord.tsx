'use client'

import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import { IActivityRecordDistinctProps } from "./RelationDependencyInfo";
import LoadingDefault from "@/app/components/LoadingDefault";
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils";
import { BsCheck } from "react-icons/bs";
import { STATUSACTIVITY } from "@/app/types/entities/Activity";

interface RelationDependencyRecordProps {
    record: IActivityRecordDistinctProps
}

const RelationDependencyRecord: React.FC<RelationDependencyRecordProps> = ({ record }) => {
    const { data: activity, isLoading } = useActivityById({ activityId: record.activityId })

    if (!activity || isLoading) {
        return <div>Carregando ....</div>
    }
    return (
        <div className="flex felx-col w-full items-center gap-1 px-1">
            <div className={`${activity.progress_status == STATUSACTIVITY.CLOSED ? "text-green-600" : "text-zinc-500"}`}>
                <BsCheck size={20} />
            </div>
            <div className="flex-1 overflow-hidden overflow-ellipsis truncate">{activity.title}</div>
            <div className="overflow-hidden overflow-ellipsis w-20 truncate"> {activity.id}</div>
            <div className="text-zinc-400 font-semibold w-20 ">{parseDateToMaskDate(record.date_linked)}</div>
        </div>
    );
}

export default RelationDependencyRecord;