
import useUserInfoById from "@/app/hooks/consumeApiEndpoint/useUserInfoById";
import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity";
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils";

interface AnnexActivityRecordProps {
    annex: IAnnexActivityProps
}

const AnnexActivityRecord: React.FC<AnnexActivityRecordProps> = ({ annex }) => {

    const { data: userInfo } = useUserInfoById({ userId: annex.user_id });

    return (
        <div className="flex items-center gap-1">
            <div className="w-5"></div>
            <div className="flex-1 overflow-hidden overflow-ellipsis truncate ">{annex.original_name}</div>
            <div className="w-20">{parseDateToMaskDate(annex.publication_date)}</div>
            {userInfo && <div className=" w-20 overflow-hidden overflow-ellipsis truncate">{userInfo.name}</div>}

        </div>
    );
}

export default AnnexActivityRecord;