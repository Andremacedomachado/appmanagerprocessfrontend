
import { useAnnexByActivityId } from "@/app/hooks/consumeApiEndpoint/useAnnexByActivityId";
import AnnexActivityTable from "./AnnexActivityTable";
import LoadingTable from "./LoadingTable";

interface AnnexActivityInfoProps {
    activityId: string
}


const AnnexActivityInfo: React.FC<AnnexActivityInfoProps> = ({ activityId }) => {
    const { data: annexsInfo, error, isLoading, isValidating, mutate } = useAnnexByActivityId({ activityId });

    if (!annexsInfo || isLoading) {
        return <LoadingTable dimension="my-2 mx-1 h-5 w-5/6" />
    }

    return <AnnexActivityTable annexs={annexsInfo} />
}

export default AnnexActivityInfo;