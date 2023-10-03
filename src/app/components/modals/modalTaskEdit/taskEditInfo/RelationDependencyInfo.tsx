'use client'

import LoadingDefault from "@/app/components/LoadingDefault";
import { useRecordDependencyAdjacents } from "@/app/hooks/consumeApiEndpoint/useRecordDependencyAdjacents";
import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import RelationDependencyTable from "./RelationDependencyTable";
import LoadingTable from "./LoadingTable";

export interface IActivityRecordDistinctProps {
    activityId: string, date_linked: Date
}

const filterActivityIdDistinct = (records: IRecordDependencyProps[], matcher: string) => {
    const activityIds: IActivityRecordDistinctProps[] = []

    records.forEach(record => {
        if (record.children_id != matcher) {
            const prettyData: IActivityRecordDistinctProps = {
                activityId: record.children_id,
                date_linked: record.dependency_linked_date
            }
            activityIds.push(prettyData)
        }
        if (record.parent_id != matcher) {
            const prettyData: IActivityRecordDistinctProps = {
                activityId: record.parent_id,
                date_linked: record.dependency_linked_date
            }
            activityIds.push(prettyData)
        }

    })
    return activityIds
}

const RelationDependencyInfo = () => {
    const matcher = { activityId: '803574bc-9793-4b52-b4f7-1baa5a7f113a' }
    const { data, error, isLoading, isValidating, mutate } = useRecordDependencyAdjacents(matcher)
    if (!data || isLoading) {
        return <LoadingTable dimension="my-2 mx-1 h-5 w-5/6"/>
    }

    const recordsDependency = filterActivityIdDistinct(data, matcher.activityId);

    return (
        <RelationDependencyTable data={recordsDependency} />
    );
}

export default RelationDependencyInfo;