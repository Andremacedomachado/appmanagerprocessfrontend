import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import Form from '@/app/components/ui/dashboard/gestor/users/create/FormCreateUser'
import { getAllSectors } from '@/app/lib/data'

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const { data: sectors, success } = await getAllSectors();
    console.log('sectors', sectors, success)
    const urlbase = `/dashboard/${id}/gestor/users`
    return (
        <main className="h-full w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Usuarios', href: urlbase, },
                    {
                        label: 'Criar',
                        href: urlbase + '/create',
                        active: true,
                    },
                ]}
            />
            {sectors && <Form sectors={sectors} />}

        </main>
    )
}