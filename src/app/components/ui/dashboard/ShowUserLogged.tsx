
import Image from "next/image";
import Avatar from "../../Avatar";
import { getUserInfo } from "@/app/lib/data";
import ListingRoles from "@/app/(pagesRequireAutentication)/[userId]/listingRoles/listingRole";
import { RoleFormatInUser } from "@/app/types/UserInfo";
import Link from "next/link";


export function InfoFieldUser({ value, field }: { value: string, field: string }) {
    return (
        <p><span className="text-orange-400 font-semibold ">{field} :</span> {value}</p>
    )
}

export function ListRolesOfUserCurrent({ roles, userId }: { userId: string, roles: Array<RoleFormatInUser> }) {
    if (roles.length == 0 || !roles) {
        return <div>
            <p>
                Usuario sem funções cadastradas. Contate o administrado para atribuir função e libera acesso.
            </p>
        </div>
    }
    return <>
        {roles.map((role) => (<Link className="flex justify-center p-1 rounded-md bg-orange-400 text-white font-semibold hover:bg-orange-600" href={`/dashboard/${userId}/${role.roleName.toLowerCase()}`} key={role.roleId}>{role.roleName.toUpperCase()}</Link>))}
    </>
}

export async function ShowUserLogged({ id }: { id: string }) {
    const { success, data: user, errors } = await getUserInfo(id);

    if (!success || !user) {
        return (
            <div>
                error
            </div>
        )
    }
    const rolesToString = user.roles.length == 0 ? 'Sem função' : user.roles.map(roles => roles.roleName).reduce((textResult, roleCurrent, index) => {
        if (user.roles.length == 0) {
            textResult = roleCurrent.toLowerCase()
        }
        textResult = textResult + ', ' + roleCurrent.toLowerCase()
        return textResult
    })

    return (
        <div className="py-4 px-3 rounded-md shadow-md flex flex-col gap-3  overflow-hidden text-ellipsis ">
            <h1 className="text-3xl font-semibold text-orange-400">Usuario</h1>
            <div className="flex  gap-2">
                <div className="flex flex-col  items-center gap-2">
                    <Avatar size={180} src="/images/avatar-png-icon.png" />
                    <div>
                        <InfoFieldUser field="Nome" value={user.name} />
                        <InfoFieldUser field="Email" value={user.email} />
                        <InfoFieldUser field="Status" value={user.status == 'ACTIVE' ? 'Ativo' : 'Inativo'} />
                        <InfoFieldUser field="Cargos" value={rolesToString} />
                        <InfoFieldUser field="Setor" value={user.organization_linked.organizationName} />
                    </div>
                </div>
                <div className="flex flex-col justify-center  max-w-xs font-sans text-xl gap-4">
                    <p className=" first-letter:ml-6">Seja bem vindo {user?.name} ao Sistema de gestao de tarefas do Municipio. Para proseguir escolha uma cargo na listagem:</p>
                    <div className="flex flex-col gap-2">

                        <ListRolesOfUserCurrent roles={user.roles} userId={user.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}