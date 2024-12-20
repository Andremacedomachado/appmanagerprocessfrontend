import ModalTaskEdit from "@/app/components/modals/ModalTaskEdit";
import { getActivity, getActivityInfoAdjacents, getAnnex, getCollaboratorsRecentsUserInfo, getCollaboratorsUserInfo, getMessageActivity, } from "@/app/lib/data";



export default async function Page({ params: { activityId, userIdActivity, id } }: { params: { activityId: string, userIdActivity: string, id: string } }) {

    const { data: activity, errors } = await getActivity({
        query: {
            keys: ['id'],
            value: activityId
        }
    })

    console.log('ATIVIDADE', activity ? activity[0] : 'sem dados', errors)

    const { data: collaborators } = await getCollaboratorsUserInfo(activityId)
    const { data: collaboratorsRecents } = await getCollaboratorsRecentsUserInfo(userIdActivity)
    const { data: activitiesAdjacents } = await getActivityInfoAdjacents(activityId)
    const { data: annexs } = await getAnnex(activityId)
    const { data: messages } = await getMessageActivity({ query: { keys: ['activity_id'], value: activity ? activity[0].id : '' } })
    return (
        <main>
            <div className="flex flex-col justify-center">
                <p>dados</p>
                <p>

                    {JSON.stringify(activity, null, 2)}
                </p>
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
                    buttonTitleTrigger='Selecionar'
                />
            }
        </main>
    )
}