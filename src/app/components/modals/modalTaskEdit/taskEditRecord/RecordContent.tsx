'use client'

import useUserInfoById from "@/app/hooks/consumeApiEndpoint/useUserInfoById";
import { IMessageActivityProps, TYPEMESSAGE } from "@/app/types/entities/MessageActivity";
import RecordComment from "./RecordComment";
import RecordSystemComment from "./RecordSytemComment";

interface RecordContentProps {
    message: IMessageActivityProps,
}

const RecordContent = ({ message }: RecordContentProps) => {
    const { data: user } = useUserInfoById({ userId: message.user_id })

    if (message.type_message == TYPEMESSAGE.USER) {
        return <RecordComment message={message} user={user} />
    }

    return <RecordSystemComment message={message} user={user} />

}

export default RecordContent;