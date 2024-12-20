'use server'
import { unstable_noStore as noStore } from "next/cache"
import { verifyAuthRequest } from "../../../auth"
import { FethSSRResponse, fetchSSR } from "../utils/fetchSSR"
import { ICollaboratorProps } from "../types/entities/Collaborator"
import { UserInfo } from "../types/UserInfo"
import { ISectorProps } from "../types/entities/Sector"
import { IRoleProps } from "../types/entities/Roles"
import { IOrganizationProps } from "../types/entities/Organization"
import { ActivitySchema, GetActivitySchema, GetAnnexActivitySchema, GetCollaboratorsSchema, GetMessageActivitySchema, GetRecordRelationSchema, OrganizationSchema, SectorSchema } from "./schemas"
import { IUserProps } from "../types/entities/User"
import { IActivityProps } from "../types/entities/Activity"
import { ZodType } from "zod"
import { IRecordDependencyProps } from "../types/entities/RecordDependency"
import { IAnnexActivityProps } from "../types/entities/AnnexActivity"
import { IMessageActivityProps } from "../types/entities/MessageActivity"

export async function getAllUsers() {

    noStore()

    return fetchSSR<UserInfo[]>({
        method: 'GET',
        input: process.env.NEXT_URL_API + '/user'
    })

}

export async function getUserInfo(userId: string) {

    noStore()

    return fetchSSR<UserInfo>({
        method: 'GET',
        input: process.env.NEXT_URL_API + '/user/' + userId
    })

}

export async function getManyUser({ query }: { query?: { keys?: string[], value?: string } }) {
    noStore()

    const searchParams = query ? new URLSearchParams(query.keys?.map(k => ['keys', k])) : undefined;
    const searchParamsValue = query?.value ? new URLSearchParams({ value: query.value }) : undefined
    const input = searchParams && searchParamsValue ? process.env.NEXT_URL_API + `/users?${searchParams}&${searchParamsValue.toString()} ` : process.env.NEXT_URL_API + '/users';
    return fetchSSR<IUserProps[]>({
        method: 'GET',
        input
    })
}

export async function getCollaboratorsUserInfo(activityId: string): Promise<FethSSRResponse<UserInfo[]>> {
    noStore()
    const { data: collaborators, success, errors } = await getCollaborators({ query: { keys: ['activity_id'], value: activityId } })
    if (success && collaborators) {
        const collaboratorsIds = collaborators.map(collab => collab.user_id);
        const users = await Promise.all([
            ...collaboratorsIds.map(id => {
                return getUserInfo(id).then((response) => {
                    if (response.data) {
                        return response.data
                    }
                    return undefined
                })
            })
        ])
        const usersInActivity = users.filter(user => user != undefined) as UserInfo[]
        return { success: true, data: usersInActivity }
    }

    return { success, errors }
}

export async function getCollaboratorsRecentsUserInfo(userId: string): Promise<FethSSRResponse<UserInfo[]>> {
    noStore()
    const { data: collaborators, success, errors } = await getCollaborators({ query: { keys: ['user_id'], value: userId } })
    if (success && collaborators) {
        const collaboratorsActivityIds = collaborators.map(collab => collab.activity_id);
        const users = await Promise.all([
            ...collaboratorsActivityIds.map(async (id) => {
                return await getCollaboratorsUserInfo(id).then((response) => {
                    if (success) {
                        return response.data
                    }
                    return undefined
                })
            })
        ]).then(data => data.filter(value => value !== undefined) as UserInfo[][])
        const usersInActivity = users
            .reduce((prev, next) => {
                return prev.concat(next)
            })
            .filter((user, index, users) => {
                return index === users.findIndex(u => u.id === user.id)
            })
            .filter(user => user.id !== userId)

        return { success: true, data: usersInActivity }
    }

    return { success, errors }
}

export async function getCollaborator(userId: string) {
    noStore()

    return fetchSSR<Array<ICollaboratorProps>>({
        method: 'GET',
        input: process.env.NEXT_URL_API + '/collaboratorsByUser/' + userId
    })
}



export async function getAllRoles() {
    noStore()

    return fetchSSR<Array<IRoleProps>>({
        method: 'GET',
        input: process.env.NEXT_URL_API + '/roles'
    })
}

export async function getAllOrganizations() {
    noStore()

    return fetchSSR<Array<IOrganizationProps>>({
        method: 'GET',
        input: process.env.NEXT_URL_API + '/organizations'
    })
}

export async function getAllSectors() {
    noStore()

    return fetchSSR<Array<ISectorProps>>({
        method: 'GET',
        input: process.env.NEXT_URL_API + '/sector'
    })
}

export async function getOrganization(id: string) {
    noStore()
    var dataResponse = await fetchSSR<IOrganizationProps>({
        method: 'GET',
        input: process.env.NEXT_URL_API + `/organization/${id}`
    })

    if (dataResponse.data) {

        const verifyPaserdData = OrganizationSchema.safeParse(dataResponse.data)
        if (verifyPaserdData.success)
            dataResponse.data = verifyPaserdData.data
    }


    return dataResponse
}

export async function getSector(id: string) {
    noStore()
    var dataResponse = await fetchSSR<ISectorProps>({
        method: 'GET',
        input: process.env.NEXT_URL_API + `/sector/${id} `
    })
    console.log(dataResponse)
    if (dataResponse.data) {
        const verifyPaserdData = SectorSchema.safeParse(dataResponse.data)
        if (verifyPaserdData.success)
            dataResponse.data = verifyPaserdData.data
    }
    return dataResponse
}


export async function getActivity({ query }: { query: { keys?: string[], value?: string } }) {
    noStore()
    const searchParams = query ? new URLSearchParams(query.keys?.map(k => ['keys', k])) : undefined;
    const searchParamsValue = query?.value ? new URLSearchParams({ value: query.value }) : undefined

    const input = searchParams && searchParamsValue ? process.env.NEXT_URL_API + `/activity?${searchParams}&${searchParamsValue?.toString()}` : process.env.NEXT_URL_API + `/activity`
    var dataResponse = await fetchSSR<IActivityProps[]>({
        method: 'GET',
        input
    })
    if (dataResponse.data) {
        console.log('REQUEST SERVER SIDE', dataResponse.data)
        const verifyPaserdData = GetActivitySchema.safeParse(dataResponse.data)
        if (verifyPaserdData.success)
            dataResponse.data = verifyPaserdData.data
    }
    return dataResponse
}

export async function getCollaborators({ query }: { query: { keys?: string[], value?: string } }) {
    noStore()
    const params = "/collaborators"
    const response = await getDataSimplePerQuery<ICollaboratorProps[]>({ params, query, schema: GetCollaboratorsSchema })
    return response
}

export async function getRecordRelationAdjacents(activityId: string) {
    noStore()
    const params = "/recordDependency"
    const query = new URLSearchParams({ activityId })
    const response = await getDataSimple<IRecordDependencyProps[]>({ params, query, schema: GetRecordRelationSchema })

    return response
}
export interface GetActivityInfoAdjacentsResponseData {
    activities: IActivityProps[],
    records: IRecordDependencyProps[]
}
export async function getActivityInfoAdjacents(activityId: string): Promise<FethSSRResponse<GetActivityInfoAdjacentsResponseData>> {
    noStore()
    const responseRecords = await getRecordRelationAdjacents(activityId);

    if (!responseRecords.data || responseRecords.data.length == 0) {
        return { success: responseRecords.success }
    }

    const responseActivitiesInfo = await Promise.all([
        ...responseRecords.data.map(async (record) => {
            const activityIdAdjacent = activityId == record.parent_id ? record.children_id : record.parent_id;
            const activityInfo = await getActivity({ query: { keys: ['id'], value: activityIdAdjacent } }).then(res => {
                if (res.success && res.data) {
                    return res.data[0]
                }
                return undefined
            })
            return activityInfo
        })
    ]).then(data => {
        return data.filter(d => d != undefined) as IActivityProps[]
    })

    return { success: true, data: { activities: responseActivitiesInfo, records: responseRecords.data } }
}


export async function getAnnex(activityId: string) {
    noStore()
    const params = `/annexActivity/${activityId}`
    const response = await getDataSimple<IAnnexActivityProps[]>({ params, schema: GetAnnexActivitySchema })
    return response
}

export async function getMessageActivity({ query }: { query: { keys?: string[], value?: string } }) {
    noStore()
    const params = `/messageActivity`
    const response = await getDataSimplePerQuery<IMessageActivityProps[]>({ params, query, schema: GetMessageActivitySchema })
    return response
}

export interface IGetDataSimpleProps {
    query?: URLSearchParams
    params: string,
    schema: ZodType
}

export async function getDataSimple<T extends Object | Object[]>({ query, params, schema }: IGetDataSimpleProps) {
    noStore()
    const input = query ? process.env.NEXT_URL_API + `${params}?${query}` : process.env.NEXT_URL_API + `${params}`
    var dataResponse = await fetchSSR<T>({
        method: 'GET',
        input
    })
    if (dataResponse.success) {
        const verifyPaserdData = schema.safeParse(dataResponse.data)
        if (verifyPaserdData.success)
            dataResponse.data = verifyPaserdData.data as T
    }
    return dataResponse
}

export interface IGetDataSimplePerQueryProps {
    query?: { keys?: string[], value?: string },
    params: string,
    schema: ZodType,

}

export async function getDataSimplePerQuery<T extends Object | Object[]>({
    params, schema, query
}: IGetDataSimplePerQueryProps) {
    noStore()
    const searchParamskeys = query?.keys ? new URLSearchParams(query.keys?.map(k => ['keys', k])) : undefined;
    const searchParamsValue = query?.value ? new URLSearchParams({ value: query.value }) : undefined
    const queryWithValue = new URLSearchParams(searchParamskeys && searchParamsValue ? `${searchParamskeys}&${searchParamsValue?.toString()}` : undefined)
    var dataResponse = await getDataSimple<T>({ params, schema, query: queryWithValue })
    return dataResponse

}



