
'use client'

import { InputFormGroupCheckboxOneOption, InputFormNumber, InputFormText } from "@/app/components/inputs/InputForm";
import { updateSector } from "@/app/lib/actions";
import { StateSector } from "@/app/lib/schemas"
import { IOrganizationProps } from "@/app/types/entities/Organization";
import { ISectorProps } from "@/app/types/entities/Sector"
import { useFormState } from "react-dom";
import { Button } from "../../layout/Buttons";
import { usePathname } from "next/navigation";

export interface FormSectorEditProps {
    sector: ISectorProps,
    organizations: IOrganizationProps[],

}

export function FormSectorEdit({ sector, organizations }: FormSectorEditProps) {
    const initialValue = { message: undefined, errors: {} } as StateSector;
    const pathname = usePathname().split(sector.id)[0]
    const updateSectorWithId = updateSector.bind(null, sector.id)
    const [state, dispatch] = useFormState(updateSectorWithId, initialValue)
    return (
        <form action={dispatch}>
            <InputFormText name="name" label="Nome do Setor" errors={state?.errors?.name} defaultValue={sector.name} />
            <InputFormNumber name="employeesAllocated" label="N° de funcionario" defaultValue={sector.employeesAllocated} />

            <InputFormGroupCheckboxOneOption
                name="organization_id"
                label="Organização"
                initValue={sector.organization_id}
                listOption={organizations.map(org => ({
                    label: org.name,
                    value: org.id
                }))} />

            <div className="flex justify-end gap-1">
                <Button href={pathname}>Voltar</Button>
                <button type="submit" className="rounded p-2 bg-orange-400 font-semibold text-white hover:bg-orange-500 transition"> Salvar</button>
            </div>

        </form>
    )
}