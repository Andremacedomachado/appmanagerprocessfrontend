'use client'

import { InputForm, InputFormDate, InputFormNumber, InputFormText } from "@/app/components/inputs/InputForm";
import { updateOrganization } from "@/app/lib/actions";
import { StateOrganization } from "@/app/lib/schemas";
import { IOrganizationProps } from "@/app/types/entities/Organization"
import { useFormState } from "react-dom";
import { Button } from "../layout/Buttons";

export interface FormOrganizationEditProps {
    buttonBack?: boolean
    urlBack?: string
    organization: IOrganizationProps
}

export function FormOrganizationEdit({ organization, buttonBack = false, urlBack }: FormOrganizationEditProps) {
    const initialValue = { error: {}, message: '' } as StateOrganization;
    const updateOrganizationWithId = updateOrganization.bind(null, organization.id);
    const [state, dispach] = useFormState(updateOrganizationWithId, initialValue);
    return (
        <form action={dispach} >
            <InputFormText label="Id" name="id" disabled errors={state?.errors?.id} defaultValue={organization.id} />
            <InputFormText label="Nome" name="name" errors={state?.errors?.name} defaultValue={organization.name} />
            <InputFormNumber label="Numero de funionarios" type="number" defaultValue={organization.employeesAllocated} name="employeesAllocated" errors={state?.errors?.employeesAllocated} />

            <InputFormDate label="Data de cadastramento" disabled defaultValue={organization.created_at} name="created_at" errors={state?.errors?.created_at} />

            <div className="flex gap-2 py-2 ">
                {urlBack && buttonBack && <Button href={urlBack}> Voltar</Button>}
                <button type="submit">salvar</button>
            </div>
        </form>
    )
}
