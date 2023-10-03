import { Collaborator } from "@/app/types/CollectionActivityTree";
import { UserInfo } from "@/app/types/UserInfo";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import PassSearchParamsBetweenRequest from "@/app/utils/passSearchParamsBetweenRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";


const endPointResourceCollaboratorByUser = '/collaboratorsByUser?'
const endPointResourceCollaboratorByActivity = '/collaboratorsByActivity?'
const endPointResourceUserInfo = '/user?'

export const GetInfoCollaboratorAllActivityRequestSchema = z.object({
    userId: z.string().uuid(),
})

export type GetInfoCollaboratorAllActivityRequestData = z.infer<typeof GetInfoCollaboratorAllActivityRequestSchema>

const getAllInfoUser = async (collaborators: Collaborator[]) => {
    const collaboratorsWithInfo: UserInfo[] = []
    for (const collaborator of collaborators) {
        const params = new URLSearchParams({ userId: collaborator.user_id }).toString()
        const infoCurrent = await fetchWrapperSSR<UserInfo>({ method: 'GET', input: `${process.env.URL_API + endPointResourceUserInfo + params}` })
        collaboratorsWithInfo.push(infoCurrent)
    }

    return collaboratorsWithInfo
}

const getAllRecordCollaboratorInAllActivities = async (activityIds: string[]) => {
    const recordsCollaboratorsresult: Collaborator[] = []
    for (const id of activityIds) {
        const params = new URLSearchParams({ activityId: id }).toString()
        const recordsCurrent = await fetchWrapperSSR<Collaborator[]>({ method: 'GET', input: `${process.env.URL_API + endPointResourceCollaboratorByActivity + params}` })
        const recordsDistinct = recordsCurrent.filter(record => {
            return recordsCollaboratorsresult.map(result => result.user_id).indexOf(record.user_id) == -1
        })
        recordsCollaboratorsresult.push(...recordsDistinct)
    }
    return recordsCollaboratorsresult
}
export async function GET(req: NextApiRequest) {
    try {
        //find all actvity correlation with userId
        /*  const urlBackend = PassSearchParamsBetweenRequest(req, GetInfoCollaboratorAllActivityRequestSchema, endPointResourceCollaboratorByUser)
         const response = await fetchWrapperSSR<Collaborator[]>({
             method: { type: 'GET' },
             input: urlBackend.href,
         })
         const activityCorrelation = response.map(record => record.activity_id)
         const collaboratorsCorrelation = await getAllRecordCollaboratorInAllActivities(activityCorrelation)
 
         const result = await getAllInfoUser(collaboratorsCorrelation) */

        const result: UserInfo[] = [{
            id: '1',
            name: 'mockTest',
            email: 'mock@gmail.com',
            created_at: new Date(),
            updated_at: new Date(),
            organization_linked: {
                dateLinkSector: new Date(),
                organizationId: '1',
                organizationName: 'CPD'
            },
            status: 'ACTIVE',
            roles: []
        }]
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, stack: error.stack })
        }
        return NextResponse.json({ error: { ...error as any } })
    }
}