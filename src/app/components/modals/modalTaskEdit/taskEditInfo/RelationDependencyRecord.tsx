'use client'

import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils";
import { BsCheck } from "react-icons/bs";
import { IActivityProps, STATUSACTIVITY } from "@/app/types/entities/Activity";
import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";

interface RelationDependencyRecordProps {
    activity: IActivityProps,
    record: IRecordDependencyProps
}

const RelationDependencyRecord: React.FC<RelationDependencyRecordProps> = ({ activity, record }) => {

    return (
        <div className="flex felx-col w-full items-center gap-1 px-1">
            <div className={`${activity.progress_status == STATUSACTIVITY.CLOSED ? "text-green-600" : "text-zinc-500"}`}>
                <BsCheck size={20} />
            </div>
            <div className="flex-1 overflow-hidden overflow-ellipsis truncate">{activity.title}</div>
            <div className="overflow-hidden overflow-ellipsis w-20 truncate"> {activity.id}</div>
            <div className="text-zinc-400 font-semibold w-20 ">{parseDateToMaskDate(record.dependency_linked_date)}</div>
        </div>
    );
}

export default RelationDependencyRecord;