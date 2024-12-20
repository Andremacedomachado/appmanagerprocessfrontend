'use client'
import { InputForm, InputFormGroupCheckBox, InputFormText } from "@/app/components/inputs/InputForm";
import { updatePermissionUser } from "@/app/lib/actions";
import { UserInfo } from "@/app/types/UserInfo";
import { IRoleProps } from "@/app/types/entities/Roles";
import { useFormState } from "react-dom";

export interface FormPermissionUserProps {
    user: UserInfo,
    adjusterId: string,
    roles: Array<IRoleProps>
}

export default function FormPermissionUser({ roles, adjusterId, user }: FormPermissionUserProps) {
    const initialState = { message: null, errors: {} };
    const userId = user.id
    const updatePermissionUserWithId = updatePermissionUser.bind(null, adjusterId).bind(null, userId)
    const [state, dispatch] = useFormState(updatePermissionUserWithId, initialState)
    console.log(state)
    return <form action={dispatch} className="gap-1 flex flex-col p-2">
        <InputFormText label="Id" name="id" type="text" disabled defaultValue={user.id} value={user.id} />

        <InputFormText label="Nome" name="name" type="text" disabled defaultValue={user.name} />
        <InputFormText label="Senha" name="password" type="text" defaultValue={''} errors={state?.errors?.password} />

        <InputFormGroupCheckBox
            label="Cargos"
            name="roleIds"
            initValue={user.roles.map(r => r.roleId)}
            listOption={roles.map(role => ({ label: role.name, value: role.id }))}
            errors={state?.errors?.rolesIds}
        />

        {state?.message && <pre>{JSON.stringify(state, null, 2)}</pre>}
        {/* <InputFormGroupCheckBox label="cargo" name="roleIds" listOption={roles.map(role => ({ label: role.name, value: role.id }))} /> */}
        <div className=" flex p-2">
            <button type="submit" className="px-3 bg-orange-400 text-white font-semibold text-lg rounded hover:bg-orange-600"> Salvar</button>
        </div>
    </form>
}