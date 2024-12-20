import Heading from "@/app/components/Heading"
import { Button } from "@/app/components/ui/dashboard/gestor/layout/Buttons"
import { Table } from "@/app/components/ui/table/Table"
import { getAllOrganizations, getAllSectors } from "@/app/lib/data"
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils"

export default async function Page({ params: { id } }: { params: { id: string } }) {

    const { data: organizations } = await getAllOrganizations()
    const headers = [["Nome", "id", "Data de criação", "N° Funcionarios ", "Ações",]]
    const tbodycontent = organizations?.map(organization => ([
        organization.name,
        organization.id,
        parseDateToMaskDate(organization.created_at as Date),
        organization.employeesAllocated,
        <Button href={`/dashboard/${id}/gestor/organization/${organization.id}/edit`} key={organization.id}> Editar</Button>
    ]))
    return (
        <main className="w-full gap-1 px-3">
            <div className="text-orange-400">
                <Heading title="Pagina de listagem de organização" />
            </div>

            <Table contentsHead={headers} contentsBody={tbodycontent} />



        </main>
    )
}