
import { useAnnexByActivityId } from "@/app/hooks/consumeApiEndpoint/useAnnexByActivityId";
import AnnexActivityTable from "./AnnexActivityTable";
import LoadingTable from "./LoadingTable";
import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity";

interface AnnexActivityInfoProps {
    annexs?: IAnnexActivityProps[]
}


const AnnexActivityInfo: React.FC<AnnexActivityInfoProps> = ({ annexs }) => {
    return <AnnexActivityTable annexs={annexs} />
}

export default AnnexActivityInfo;