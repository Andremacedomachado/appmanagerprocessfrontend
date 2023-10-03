import { fetchWrapperSSR, parsePayloadToSearchParams } from "@/app/utils/fetchSSR"

const endpoint = `${process.env.URL_API}/messageActivity/activityId`

interface getMessageInActivityByIdProps {
    activityId: string
}

export async function getMessageInActivityById({ activityId }: getMessageInActivityByIdProps) {
    const input = parsePayloadToSearchParams({ data: { activityId }, urlBase: endpoint })

    const responseApi = await fetchWrapperSSR({
        method: 'GET',
        input,
    })
    return responseApi
}