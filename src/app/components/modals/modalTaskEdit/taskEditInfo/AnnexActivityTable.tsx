

import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity";
import AnnexActivityRecord from "./AnnexActivityRecord";

interface AnnexActivityTableProps {
    annexs: IAnnexActivityProps[]
}
const AnnexActivityTable: React.FC<AnnexActivityTableProps> = ({ annexs }) => {
    return (
        <div
            className="
                border-[2px] 
                border-zinc-400 
                rounded-md
                text-xs
            "
        >
            <div className="flex felx-col items-center gap-1 border-b-[2px] border-zinc-400 px-1 font-semibold">
                <div className="w-5"></div>
                <div className="flex-1">Nome</div>
                <div className="w-20">Data</div>
                <div className=" w-20 overflow-hidden overflow-ellipsis truncate">Usuario</div>
            </div>

            {annexs.map((annex, idx) => (
                <AnnexActivityRecord annex={annex} key={idx} />
            ))}

        </div>
    );
}

export default AnnexActivityTable;