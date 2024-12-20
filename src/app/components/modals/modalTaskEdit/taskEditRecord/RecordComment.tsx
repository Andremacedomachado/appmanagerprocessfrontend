

import useUserInfoById from "@/app/hooks/consumeApiEndpoint/useUserInfoById";
import ButtonCirclePerson from "../taskEditHeader/ButtonCirclePerson";
import RecordHeader from "./RecordHeader";
import { IMessageActivityProps, TYPEMESSAGE } from "@/app/types/entities/MessageActivity";
import { format, parseISO } from "date-fns";
import { UserInfo } from "@/app/types/UserInfo";
import SkeletonOverlay from "@/app/components/SkeletonOverlay";

interface RecordCommentProps {
    message: IMessageActivityProps,
    user: UserInfo
}

const RecordComment: React.FC<RecordCommentProps> = ({ message, user }) => {
    console.log(typeof message.publication_date)
    return (
        <div className=" flex w-full ">

            <div className="p-1 flex">
                <ButtonCirclePerson
                    colorIndex={1}
                    fullName={user.name}
                    size={8}
                />
            </div>
            <div className="flex flex-col gap-2 p-1 items-center text-sm font-light w-full shadow-sm  border-l-2 border-orange-400 bg-white rounded-r-md">
                <RecordHeader
                    userinfo={user}
                    publication_date={message.publication_date}
                />
                <div className="flex justify-start gap-1 w-full pl-2 ">
                    <span> {message.content}</span>
                </div>
            </div>

        </div>
    );



}

export default RecordComment;