'use client'

import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import { IActivityRecordDistinctProps } from "./RelationDependencyInfo";
import RelationDependencyRecord from "./RelationDependencyRecord";

interface RelationDependencyTableProps {
    data: IActivityRecordDistinctProps[],

}

const RelationDependencyTable: React.FC<RelationDependencyTableProps> = ({ data }) => {

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
                <div className="w-20">Id</div>
                <div className=" w-20 overflow-hidden overflow-ellipsis truncate">Data de vinculo</div>
            </div>

            {data.map((record, idx) => (
                <RelationDependencyRecord record={record} key={idx} />
            ))}

        </div>
    );
}

export default RelationDependencyTable;