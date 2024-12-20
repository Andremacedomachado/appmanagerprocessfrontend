
import { IMessageActivityProps } from "@/app/types/entities/MessageActivity";
import RecordContent from "./taskEditRecord/RecordContent";

export interface TaskEditRecordEventProps {
    messages?: IMessageActivityProps[]
}
const TaskEditRecordEvent = ({ messages }: TaskEditRecordEventProps) => {


    return (
        <>
            {messages?.map((message, idx) => (
                <RecordContent message={message} key={idx} />
            ))}
        </>
    )

}

export default TaskEditRecordEvent;