import { getAllUsers } from "@/app/lib/data"
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils"
import { capitalizeFirstLetter } from "@/app/utils/pathUtils"
import { ListActionsTableRowUser } from "./ListActionsTableRowUser"
import Breadcrumbs from "@/app/components/ui/Breadcrumbs"
import { Button } from "../../layout/Buttons"
import { IoPersonAddOutline } from "react-icons/io5"
import { Table } from "@/app/components/ui/table/Table"

export async function TableListUsers({ urlBase }: { urlBase: string }) {
    const { success, data: users } = await getAllUsers()

    if (!success || !users) {
        return <div>
            Falha ao obter dados
        </div>
    }

    const headersTable = [["Nome", "Email", "Status", "Data de criação", "Ações",]]
    const tbodycontent = users.map((user, index) => ([
        capitalizeFirstLetter(user.name),
        user.email,
        user.status,
        parseDateToMaskDate(user.created_at),
        <ListActionsTableRowUser key={index} user={user} urlbase={urlBase} />
    ]))
    return (

        <main className="h-full w-full">
            <div className="flex flex-col px-4 w-full font-sans gap-3" >
                <div>
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Usuarios', href: urlBase, active: true, },
                            {
                                label: '',
                                href: urlBase,
                                active: true,
                            },
                        ]}
                    />
                    <div className="flex w-full justify-end gap-1 ">
                        <Button href={`${urlBase}/create`} icon={IoPersonAddOutline}> Criar novo usuarios</Button>
                    </div>
                </div>
                <h1 className="text-orange-400 font-semibold text-2xl"> Lista de usuarios no sistema!</h1>

                <Table contentsHead={headersTable} contentsBody={tbodycontent} />


            </div>
        </main>
    )

}