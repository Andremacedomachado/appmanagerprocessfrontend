'use client'

import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import RelationDependencyTable from "./RelationDependencyTable";
import { IActivityProps } from "@/app/types/entities/Activity";


export interface RelationDependencyInfoProps {
    activityId: string,
    activitiesAdjacents?: IActivityProps[]
    recordsRelation?: IRecordDependencyProps[]
}

const RelationDependencyInfo = ({ activitiesAdjacents, activityId, recordsRelation }: RelationDependencyInfoProps) => {
    return (
        <RelationDependencyTable activities={activitiesAdjacents} recordsRelation={recordsRelation} />
    );
}

export default RelationDependencyInfo;