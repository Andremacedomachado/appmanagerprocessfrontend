import { UserInfo } from "@/app/types/UserInfo";
import { ICollaboratorProps } from "@/app/types/entities/Collaborator";
import { fetchWrapperSSR, parsePayloadToSearchParams } from "@/app/utils/fetchSSR";
import { getUser } from "./UserOperationSSR";
import { GetRecordRelationActivityAdjacent } from "./ActivityOperationSSR";

const endpointRequest = `${process.env.URL_API}/collaboratorsByActivity`

interface GetCollaboratorInActivityProps {
    activityId: string
}

export async function getCollaboratorsInActivity({ activityId }: GetCollaboratorInActivityProps) {
    const input = parsePayloadToSearchParams({ data: { activityId }, urlBase: endpointRequest })
    const responseApi = await fetchWrapperSSR<ICollaboratorProps[]>({
        method: 'GET',
        input
    })
    return responseApi
}

export async function getCollaboratorInfoInActivity({ activityId }: GetCollaboratorInActivityProps) {
    const recordCollaborators = await getCollaboratorsInActivity({ activityId })
    const collectionCollaboratorInfo: UserInfo[] = await Promise.all<UserInfo>(recordCollaborators.map(record => getUser({ userId: record.user_id })))
    return collectionCollaboratorInfo
}


export async function getCollaboratorInfoRecentsInActivityCorrelation({ activityId }: GetCollaboratorInActivityProps) {

    const recordActivitiesCorrelation = await GetRecordRelationActivityAdjacent({ activityId })
    const collectionCollaboratorActivityCorrelation = await Promise.all(
        recordActivitiesCorrelation.map(record => getCollaboratorsInActivity({ activityId: record.parent_id }))
    )
    const collaboratorDistinct = collaboratorUserIdDistinct(collectionCollaboratorActivityCorrelation)

    const collaboratorInfoAllCorrelation = await Promise.all(
        collaboratorDistinct.map(search => getUser<UserInfo>(search))
    )

    return collaboratorInfoAllCorrelation
}

function collaboratorUserIdDistinct(collaborators: ICollaboratorProps[][]) {
    var arrayAux: ICollaboratorProps[] = [];
    for (const arr of collaborators) {
        arr.forEach(item => arrayAux.push(item))
    }
    var arrayResult = arrayAux.map(item => ({ userId: item.user_id }))
    arrayResult = arrayResult.filter(function (este, i) {
        return arrayResult.indexOf(este) === i;
    });

    return arrayResult
}