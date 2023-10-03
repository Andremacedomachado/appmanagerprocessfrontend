
'use client'

import { CollectionActivityTree } from "@/app/types/CollectionActivityTree";
import TableBasic from "./table/TableBasic";
import useActivityByUser from "@/app/hooks/useActivityByUser";

interface CollectionListTaskProps {
    collection: CollectionActivityTree
}

const CollectionListTask = () => {

    const { data: collection, error, isLoading, isValidating, mutate } = useActivityByUser();

    if (isLoading) {
        return (
            <div>
                carregando...
            </div>
        )
    }


    return (
        <div className="flex flex-col bg-slate-200/30 overflow-scroll h-75vh px-3 py-1 pt-3 gap-6">

            {
                collection?.collectionsActivityTree.map((tree, index) =>
                    <TableBasic key={index} data={tree.activities} />
                )
            }
        </div>
    )

}

export default CollectionListTask;