'use client'

import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import RelationDependencyRecord from "./RelationDependencyRecord";
import { IActivityProps } from "@/app/types/entities/Activity";

interface RelationDependencyTableProps {
    activities?: IActivityProps[],
    recordsRelation?: IRecordDependencyProps[],

}

const RelationDependencyTable: React.FC<RelationDependencyTableProps> = ({ activities, recordsRelation }) => {

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

            {activities && recordsRelation && activities?.map((activity, idx) => (
                <RelationDependencyRecord record={recordsRelation[idx]} activity={activity} key={idx} />
            ))}

            {(!activities || activities.length == 0) && <div className="text-center ">
                Sem registros encontrados
            </div>}

        </div>
    );
}

export default RelationDependencyTable;