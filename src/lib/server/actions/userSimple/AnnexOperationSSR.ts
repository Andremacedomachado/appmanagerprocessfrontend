import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity"
import { fetchWrapperSSR, parsePayloadToSearchParams } from "@/app/utils/fetchSSR"
import { z } from "zod"

const endpoint = `${process.env.URL_API}/annexActivity/activityId`

const GetAnnexByActivityIdRequestSchema = z.object({
    activityId: z.string().uuid(),
})

interface GetAnnexByActivityIdProps extends z.infer<typeof GetAnnexByActivityIdRequestSchema> { }

export async function getAnnexByActivityId({ activityId }: GetAnnexByActivityIdProps) {
    const input = parsePayloadToSearchParams({ data: { activityId }, urlBase: endpoint })
    const responseApi = await fetchWrapperSSR<IAnnexActivityProps[]>({ input, method: 'GET' })
    return responseApi
}