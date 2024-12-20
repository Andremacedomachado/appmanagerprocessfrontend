

import useUserInfoById from "@/app/hooks/consumeApiEndpoint/useUserInfoById";
import { IMessageActivityProps, TYPEMESSAGE } from "@/app/types/entities/MessageActivity";
import RecordComment from "./RecordComment";
import RecordSystemComment from "./RecordSytemComment";
import LoadingDefault from "@/app/components/LoadingDefault";
import { getUserInfo } from "@/app/lib/data";

interface RecordContentProps {
    message: IMessageActivityProps,
}

const RecordContent = async ({ message }: RecordContentProps) => {
    const { data: user } = await getUserInfo(message.user_id)

    if (user == undefined) {
        return <LoadingDefault size={20} />
    }
    if (message.type_message == TYPEMESSAGE.USER) {
        return <RecordComment message={message} user={user} />
    }

    return <RecordSystemComment message={message} userCorrelation={user} />

}

export default RecordContent;