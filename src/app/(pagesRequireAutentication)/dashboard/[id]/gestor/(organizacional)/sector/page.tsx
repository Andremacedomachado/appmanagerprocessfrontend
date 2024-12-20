import Heading from "@/app/components/Heading"
import { TableListSectors } from "@/app/components/ui/dashboard/gestor/sector/TableListSectors"

export default async function Page() {


    return (
        <main className="h-full w-full flex flex-col gap-1 px-3" >
            <div className="text-orange-400">
                <Heading title="Pagina de listagem de setores" />
            </div>


            <TableListSectors />
        </main>
    )
}