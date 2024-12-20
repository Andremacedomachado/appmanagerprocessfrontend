import { getUserInfo } from "@/app/lib/data"

import Form from "@/app/components/ui/dashboard/gestor/users/edit/FormEditUser"
import Breadcrumbs from "@/app/components/ui/Breadcrumbs"
import { capitalizeFirstLetter } from "@/app/utils/pathUtils"

export default async function Page({ params: { userId, id } }: { params: { id: string, userId: string } }) {

    const { success, data: user, errors } = await getUserInfo(userId)
    const urlbase = `/dashboard/${id}/gestor/users`
    if (!success || !user) {
        return null
    }
    return (
        <main className="w-full h-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Usuarios', href: urlbase, },
                    {
                        label: capitalizeFirstLetter(user.name),
                        href: urlbase + `/${userId}`,

                    },
                    {
                        label: 'Editar',
                        href: urlbase + `/${userId}/edit`,
                        active: true,
                    },
                ]}
            />

            <Form user={user} />
        </main>
    )
}