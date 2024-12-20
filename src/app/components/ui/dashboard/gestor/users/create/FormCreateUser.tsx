'use client'

import { createUser } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import { InputForm, InputFormDate, InputFormGroupCheckboxOneOption, InputFormText } from "../../../../../inputs/InputForm"
import { CreateUserResponseFormData, StateUser } from "@/app/lib/schemas"
import { ISectorProps } from "@/app/types/entities/Sector"
import { USERSTATUS } from "@/app/types/UserInfo"

export default function FormCreateUser({ sectors }: { sectors: ISectorProps[] }) {
    const initialValue = { message: null, errors: {} } as StateUser
    const [state, dispatch] = useFormState(createUser, initialValue)
    return <form action={dispatch}>
        <InputFormText label="Nome" name="name" errors={state?.errors?.name} />

        <InputFormText label="Email" name="email" errors={state?.errors?.email} />

        <InputFormText label="Senha" name="password" errors={state?.errors?.password} />

        <InputFormGroupCheckboxOneOption label="Status" name="status" errors={state?.errors?.status} listOption={[{ label: 'Ativo', value: USERSTATUS.ACTIVE }, { label: 'Inativo', value: USERSTATUS.INACTIVE }]} />

        <InputFormGroupCheckboxOneOption label="Setor" name="organization_sector_id" errors={state?.errors?.organization_sector_id} listOption={sectors.map(sector => { return { label: sector.name, value: sector.id } })} />
        <InputFormDate label="data de criação" name="create_at" disabled />
        <div className=" flex flex-col items-end py-2 px-3">
            <button type="submit" className="p-2 bg-orange-400 hover:bg-orange-600 font-semibold text-white rounded"> Criar</button>
        </div>
    </form>
}