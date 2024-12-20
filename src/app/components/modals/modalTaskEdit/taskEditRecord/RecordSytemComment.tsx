'use client'

import SkeletonOverlay from "@/app/components/SkeletonOverlay";
import { UserInfo } from "@/app/types/UserInfo";
import { IMessageActivityProps } from "@/app/types/entities/MessageActivity";
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils";

interface RecordSystemCommentProps {
    message: IMessageActivityProps,
    userCorrelation?: UserInfo
}

const RecordSystemComment: React.FC<RecordSystemCommentProps> = ({ message, userCorrelation }) => {
    return (
        <div className="flex w-full justify-center text-xs font-semibold text-zinc-600">
            <div className="flex-1 flex gap-1 ">
                {userCorrelation && <span className="text-orange-600">{userCorrelation.name}</span>}
                {!userCorrelation && <span className="text-orange-600">Registro de sistema</span>}
                <span>realizou</span>
                <span>{message.content}</span>
            </div>
            <div>
                <span className='text-black font-semibold'>{parseDateToMaskDate(message.publication_date)}</span>
            </div>
        </div>
    );
}

export default RecordSystemComment;