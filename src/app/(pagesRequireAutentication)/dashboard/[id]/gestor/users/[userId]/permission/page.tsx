import Breadcrumbs from '@/app/components/ui/Breadcrumbs'
import Form from '@/app/components/ui/dashboard/gestor/users/permisson/FormPermissionUser'
import { getAllRoles, getUserInfo } from '@/app/lib/data'
import { capitalizeFirstLetter } from '@/app/utils/pathUtils'

export default async function Page({ params: { userId, id } }: { params: { userId: string, id: string } }) {

    const [{ success, data: roles }, { success: successgetUser, data: user }] = await Promise.all([getAllRoles(), getUserInfo(userId)])
    const urlbase = `/dashboard/${id}/gestor/users`
    if (!success || !roles || !user) {
        return null
    }

    return (
        <main className='w-full h-full'>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Usuarios', href: urlbase, },
                    {
                        label: capitalizeFirstLetter(user.name),
                        href: urlbase + `/${userId}`,

                    },
                    {
                        label: 'Permições',
                        href: urlbase + `/${userId}/edit`,
                        active: true,
                    },
                ]}
            />

            <Form adjusterId={id} roles={roles} user={user} />
        </main>
    )
}