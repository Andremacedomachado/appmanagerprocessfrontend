import { getActivity, getActivityInfoAdjacents, getAnnex, getCollaboratorsRecentsUserInfo, getCollaboratorsUserInfo, getMessageActivity } from "@/app/lib/data"
import ModalTaskEdit from "./ModalTaskEdit"

export interface ModalTaskEditWithData {
    id: string,
    activityId: string,
    userIdActivity: string,
    titleTriger: string
}
export const ModalTaskEditWithData = async ({ activityId, userIdActivity, id, titleTriger }: ModalTaskEditWithData) => {

    const { data: activity, errors } = await getActivity({
        query: {
            keys: ['id'],
            value: activityId
        }
    })

    const { data: collaborators } = await getCollaboratorsUserInfo(activityId)
    const { data: collaboratorsRecents } = await getCollaboratorsRecentsUserInfo(userIdActivity)
    const { data: activitiesAdjacents } = await getActivityInfoAdjacents(activityId)
    const { data: annexs } = await getAnnex(activityId)
    const { data: messages } = await getMessageActivity({ query: { keys: ['user_id'], value: userIdActivity } })
    return (
        <main>
            <div>
                <div>
                    {JSON.stringify(activity, null, 2)}
                </div>
                {
                    <ModalTaskEdit
                        userId={id}
                        activityInfo={activity ? activity[0] : undefined}
                        colaboratorsInActivity={collaborators}
                        colaboratorsRecents={collaboratorsRecents}
                        activitiesAdjacents={activitiesAdjacents}
                        annexs={annexs}
                        messages={messages}
                        buttonTitleTrigger={titleTriger}
                    />

                }

            </div>
        </main>
    )
}