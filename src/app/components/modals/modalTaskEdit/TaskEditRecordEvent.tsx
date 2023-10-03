'use client'
import useMessageByActivityId from "@/app/hooks/consumeApiEndpoint/useMessageByActivityId";
import RecordHeader from "./taskEditRecord/RecordHeader";
import ButtonCirclePerson from "./taskEditHeader/ButtonCirclePerson";
import RecordComment from "./taskEditRecord/RecordComment";
import RecordContent from "./taskEditRecord/RecordContent";
import { Suspense } from "react";
import SkeletonOverlay from "../../SkeletonOverlay";

const LoadindSkeleton = () => {
    return <SkeletonOverlay>
        <div className="flex w-full bg-slate-600"></div>
    </SkeletonOverlay>
}

const TaskEditRecordEvent = () => {
    const { data: messsages, isLoading } = useMessageByActivityId({ activityId: 'e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74' })

    if (messsages) {
        return (
            <>
                {messsages.map((message, idx) => (
                    <RecordContent message={message} key={idx} />
                ))}
            </>
        );
    }
    return null

}

export default TaskEditRecordEvent;