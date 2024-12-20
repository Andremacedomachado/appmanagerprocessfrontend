import { ButtonBack } from "@/app/components/ButonBack"
import { ButtonPushToPageSingleRecord } from "@/app/components/ui/dashboard/gestor/activity/Button"
import { HeatmapInterationActivity } from "@/app/components/ui/dashboard/gestor/activity/HeatmapInterationActivity"
import { getActivity, getMessageActivity } from "@/app/lib/data"
import { keys } from "lodash"
import { format, isAfter, isBefore } from "date-fns"
import { IActivityProps, STATUSACTIVITY } from "@/app/types/entities/Activity"
import { RadiaLBarPerformance } from "@/app/components/ui/dashboard/gestor/activity/RadialBarPerformance"
import { FilterDateRange } from "@/app/components/ui/dashboard/gestor/activity/FilterDataRange"
import { SearchTable } from "@/app/components/ui/dashboard/gestor/activity/SearchTable"
import { Table } from "@/app/components/ui/table/Table"
import { RadialBarPerfomanceInPeriod } from "@/app/components/ui/dashboard/gestor/activity/RadialBarPerfomanceInPeriod"
import { ModalTaskEditWithData } from "@/app/components/modals/ModalTaskEditWithData"



export default async function Page({ params, searchParams }: { params: { userIdActivity: string, id: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {

    const { success, data: activities, errors } = await getActivity({ query: { keys: ["responsible_id"], value: params.userIdActivity } })
    const queryMessage = {}
    const { data: messages, errors: errorsMsg } = await getMessageActivity({ query: { keys: ['user_id'], value: params.userIdActivity } })
    if (!success || !activities) {
        return <div>
            <p>deu ruim:{params.userIdActivity}</p>
            <p>errors: {JSON.stringify(errors, null, 2)}</p>
        </div>
    }
    const contentsHead = [['titulo', 'data inicial', "status", "data final", "data conclução", "Ações"]]
    const ButtonTrigger = () => {
        return (
            <div className="p2 rounded-md border border-orange-600">
                Selecionar
            </div>
        )
    }
    const contentsBody = activities.filter(act => {
        var acceptCondition = false

        if (searchParams && searchParams.keys && Array.isArray(searchParams.keys) && searchParams.value) {
            const keysVerifyMatch = keys(act).filter(k => searchParams.keys?.includes(k))
            const arrayValueMatchKey = Object.entries(act)
                .filter(record => keysVerifyMatch.includes(record[0]))
                .map(record => record[1])
                .map(v => {
                    if (typeof v === 'string') {
                        return v.toLowerCase()
                    }
                    else {
                        return new Date(v)
                    }
                })

            const condition = arrayValueMatchKey.some((v, index) => {

                if (typeof v === 'string') {
                    const query = searchParams.value as string
                    const isMatch = v.includes(query.toLowerCase())
                    return isMatch
                }
                return false
            })
            if (condition) {
                acceptCondition = true
            }

        }
        else {
            return true
        }
        return acceptCondition
    })
        .map(activity => ([
            activity.title,
            activity.start_date ? format(new Date(activity.start_date), 'dd/MM/yyyy') : 'Sem data',
            activity.progress_status,
            activity.due_date ? format(new Date(activity.due_date), 'dd/MM/yyyy') : 'Sem data',
            activity.conclusion_date ? format(new Date(activity.conclusion_date), 'dd/MM/yyyy') : 'Sem data',
            <ButtonPushToPageSingleRecord key={activity.id} id={activity.id} />
            /*   <ModalTaskEditWithData
                key={activity.id}
                id={params.id}
                activityId={activity.id}
                userIdActivity={params.userIdActivity}
                titleTriger='Abrir' /> */
        ]))

    return (
        <main className="w-full h-full">
            <div className="flex flex-col gap-3 py-3">

                <h1 className="font-semibold font-serif text-xl text-orange-400 p-2">Atividades Relacionadas com usuario: fulano</h1>
                <div className="flex gap-2  justify-center ">

                    <RadialBarPerfomanceInPeriod activities={activities} />

                    {messages && <HeatmapInterationActivity messages={messages} />}
                </div>


                <SearchTable fields={['title', 'description', 'progress_status']} />
                <Table contentsHead={contentsHead} contentsBody={contentsBody} />
                <div>
                    {errors && errors.map((error, index) => (<p key={index}>{error.message}</p>))}
                </div>

                <ButtonBack >Voltar</ButtonBack>
            </div>

        </main>
    )
}