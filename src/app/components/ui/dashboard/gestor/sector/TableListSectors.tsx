import { getAllSectors } from "@/app/lib/data"
import { parseDateToMaskDate } from "@/app/utils/dateFnsUtils"
import { Table } from "../../../table/Table"
import { ListActionsTableRowSector } from "./ListActionsTableRowSector"

export async function TableListSectors() {

    const { success, data: sectors } = await getAllSectors()


    const headers = [["Nome", "id", "Data de criação", "N° Funcionarios ", "Ações"]]
    const trb1 = sectors?.map(sector => ([
        sector.name,
        sector.id,
        parseDateToMaskDate(sector.created_at as Date),
        sector.employeesAllocated,
        <ListActionsTableRowSector key={sector.id} sector={sector} />
    ]))
    return (
        <div className="w-auto h-auto" >
            <Table contentsHead={headers} contentsBody={trb1} />
        </div>
    )
}