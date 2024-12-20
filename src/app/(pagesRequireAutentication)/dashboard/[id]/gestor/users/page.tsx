
import { TableListUsers } from "@/app/components/ui/dashboard/gestor/users/listuser/TableListUser";


export default async function Page({ params: { id } }: { params: { id: string } }) {
    const urlbase = `/dashboard/${id}/gestor/users`
    return <main className="w-full h-full">
        <TableListUsers urlBase={urlbase} />
    </main>
}


