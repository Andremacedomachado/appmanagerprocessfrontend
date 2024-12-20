
import { fetchWrapperSSR, parsePayloadToSearchParams } from "@/app/utils/fetchSSR"

interface GetUserWithOutTokenProps extends Record<string, string> {
    userId: string,
}
export async function getUser<D = unknown>(dataRequest: GetUserWithOutTokenProps) {
    const input = parsePayloadToSearchParams<GetUserWithOutTokenProps>({ data: { userId: dataRequest.userId }, urlBase: `${process.env.URL_API}/user` })
    const responseApi = await fetchWrapperSSR<D>({ input, method: 'GET' })
    return responseApi
}