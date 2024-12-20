'use client'

import FormUpdateDataPartial from "@/app/components/inputs/FormUpdatedDataPartial"
import { IActivityProps } from "@/app/types/entities/Activity"
import TaskEditInfo from "../TaskEditInfo"
import { updateActivity } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import { StateActivity } from "@/app/lib/schemas"
import TurnDisableInput from "@/app/components/inputs/TurnDisableInput"
import ButtonOption from "@/app/components/inputs/ButtonOption"
import useToggle from "@/app/hooks/utils/useToggle"
export interface FormUpdateActivityInfoProps {
    userId: string,
    activity: IActivityProps
}
export function FormUpdateActivityInfo({ activity, userId }: FormUpdateActivityInfoProps) {
    const initialValue: StateActivity = { message: null, errors: {} }
    const updateActivityWithId = updateActivity.bind(null, activity.id).bind(null, userId)
    const [state, dispatch] = useFormState(updateActivityWithId, initialValue)

    return (
        <>
            <TaskEditInfo
                title='Processo'
            >
                <FormUpdateActivityField name="title" defaultValue={activity.title} dispatch={dispatch} state={state} />



            </TaskEditInfo>
            <TaskEditInfo
                title="Descrição"
            >

                <FormUpdateActivityField name="description" defaultValue={activity.description ? activity.description : ''} dispatch={dispatch} state={state} />


            </TaskEditInfo></>
    )
}

function FormUpdateActivityField({
    name,
    dispatch,
    state,
    defaultValue }: {
        name: keyof IActivityProps, state: StateActivity | undefined,
        defaultValue: string,
        dispatch: (payload: FormData) => void
    }) {
    const errorsInField = state?.errors && state.errors[name] ? state.errors[name] : undefined
    const {
        state: IsOpen,
        toggleState
    } = useToggle()

    return (
        <form action={dispatch} className="flex gap-2 ">


            <input className="flex flex-1 font-normal border-b " type="text" name={name} defaultValue={defaultValue} />
            {errorsInField && errorsInField.map((err, index) => (
                <p key={index}>{err}</p>
            ))}

            <ButtonOption type="button" onClick={(e) => {

            }} className="mx-auto">Salvar</ButtonOption>

        </form>
    )
}