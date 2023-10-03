'use client'

import SkeletonOverlay from "@/app/components/SkeletonOverlay";
import { UserInfo } from "@/app/types/UserInfo";
import { IMessageActivityProps } from "@/app/types/entities/MessageActivity";
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils";

interface RecordSystemCommentProps {
    message: IMessageActivityProps,
    user?: UserInfo
}

const RecordSystemComment: React.FC<RecordSystemCommentProps> = ({ message, user }) => {

    if (!user) {
        <SkeletonOverlay>
            <div className=" flex w-full bg-white rounded-md">
                carregando
            </div>
        </SkeletonOverlay>
    }


    return (
        <div className="flex w-full justify-center text-xs font-semibold text-zinc-600">
            <div className="flex-1 flex gap-1">
                <span className="text-orange-600">{user?.name} </span>
                <span>{message.content}</span>
            </div>
            <div>
                <span>{parseDateToMaskDate(message.publication_date)}</span>
            </div>
        </div>
    );
}

export default RecordSystemComment;