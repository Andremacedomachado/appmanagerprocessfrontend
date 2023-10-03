import { Collaborator } from "@/app/types/CollectionActivityTree";
import { UserInfo } from "@/app/types/UserInfo";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod"

export const GetInfoCollaboratorRequestSchema = z.object({
    activityId: z.string().uuid(),
})

export type GetInfoCollaboratorRequestData = z.infer<typeof GetInfoCollaboratorRequestSchema>

const endPointResource = '/collaboratorsByActivity?'
const endPointResourceUserInfo = '/user?'

const getAllInfoUser = async (collaborators: Collaborator[]) => {
    const collaboratorsWithInfo: UserInfo[] = []
    for (const collaborator of collaborators) {
        const params = new URLSearchParams({ userId: collaborator.user_id }).toString()
        const infoCurrent = await fetchWrapperSSR<UserInfo>({ method: 'GET', input: `${process.env.URL_API + endPointResourceUserInfo + params}` })
        collaboratorsWithInfo.push(infoCurrent)
    }

    return collaboratorsWithInfo
}

export async function GET(req: NextApiRequest) {
    try {

        const urlBackend = PassSearchParamsBetweenRequest(req, GetInfoCollaboratorRequestSchema, endPointResource)

        const dataReponse = await fetchWrapperSSR<Collaborator[]>(
            {
                method: "GET",
                input: urlBackend.href,
            })
        const response = await getAllInfoUser(dataReponse)

        return NextResponse.json(response)


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack })
        }
        return NextResponse.json({ error: { ...error as any } })
    }
}