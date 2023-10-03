import { ActivityInfo } from "@/app/types/CollectionActivityTree";
import { IActivityProps, STATUSACTIVITY, TYPENODE } from "@/app/types/entities/Activity";
import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import { fetchWrapperSSR, parsePayloadToSearchParams } from "@/app/utils/fetchSSR";
import { z } from "zod";

interface GetActivityProps {
    activityId: string
}

const endpointBackend = `${process.env.URL_API}/activities`

export async function getActivityById<D = IActivityProps>({ activityId }: GetActivityProps) {
    const input = parsePayloadToSearchParams({ data: { activityId }, urlBase: endpointBackend })
    const responseApi = await fetchWrapperSSR<D>({
        input,
        method: "GET",
    })
    return responseApi
}

export interface ActivityUpdateByIdProps extends Partial<Omit<IActivityProps, 'id' | 'created_at'>> {
    id: string
}

const endPointResource = `${process.env.URL_API}/activity/update`

const UpdateActivityRequestSchema: z.ZodSchema<ActivityUpdateByIdProps> = z.object({
    id: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().optional(),
    updated_at: z.date().optional(),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]).optional(),
    due_date: z.date().optional(),
    start_date: z.date().optional(),
    responsible_id: z.string().optional(),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).optional()

})


export async function updateActivityById<D = ActivityInfo>(dataRequest: ActivityUpdateByIdProps) {
    const payloadVerified = UpdateActivityRequestSchema.parse(dataRequest)
    const responseApi = await fetchWrapperSSR<IActivityProps>({
        method: 'PUT',
        input: endPointResource,
        body: payloadVerified
    })

    return responseApi

}
interface GetRecordRelationActivityAdjacentProps {
    activityId: string
}
export async function GetRecordRelationActivityAdjacent({ activityId }: GetRecordRelationActivityAdjacentProps) {
    const endpoint = `${process.env.URL_API}/recordDependency`
    const input = parsePayloadToSearchParams({ data: { activityId }, urlBase: endpoint });
    const responseData = await fetchWrapperSSR<IRecordDependencyProps[], Error>({
        method: 'GET',
        input
    })
    return responseData
}