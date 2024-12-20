'use client'

import { InputForm, InputFormGroupCheckBox, InputFormGroupCheckboxOneOption } from "@/app/components/inputs/InputForm"
import { updateUser } from "@/app/lib/actions"
import { StateUser } from "@/app/lib/schemas"
import { USERSTATUS, UserInfo } from "@/app/types/UserInfo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFormState } from "react-dom"

export interface FormEditUserProps {
    user: UserInfo
}

export default function FormEditUser({ user }: FormEditUserProps) {

    const initialState = { message: null, errors: {} } as StateUser
    const updateUserWithId = updateUser.bind(null, user.id)
    const [state, dispatch] = useFormState(updateUserWithId, initialState);
    const pathPageUsers = usePathname().split('/gestor/users/' + user.id)[0] + '/gestor/users/'


    return (
        <form action={dispatch} className="flex flex-col gap-2">
            <InputForm label="Id" name="id" disabled defaultValue={user.id} />
            <InputForm label="Nome" name="name" defaultValue={user.name} errors={state?.errors?.name} />
            <InputForm label="Email" name="email" defaultValue={user.email} errors={state?.errors?.email} />
            <InputFormGroupCheckboxOneOption label="Status" name="status" initValue={user.status} errors={state?.errors?.status} type="radio" listOption={[{ label: 'Ativo', value: USERSTATUS.ACTIVE }, { label: 'Inativo', value: USERSTATUS.INACTIVE }]} />
            <div className="flex gap-2 ">
                <button type="submit" className="p-2 bg-orange-400 rounded text-white font-semibold"> alterar</button>
                <Link href={pathPageUsers} className="flex justify-center p-2 bg-orange-400 rounded text-white font-semibold"  > voltar </Link>
            </div>
        </form>
    )
}