'use client'
import { ColumnResizeMode, Header, Table, flexRender } from "@tanstack/react-table"
import { ActivityInfoPart } from "./DraggableColumnHeader"
import HandleRezisingItem from "./HandleRezisingItem"

export interface ColumnHeaderBasicProps {
    table: Table<ActivityInfoPart>,
    header: Header<ActivityInfoPart, unknown>
    columnResizeMode: ColumnResizeMode
}

const ColumnHeaderBasic: React.FC<ColumnHeaderBasicProps> = ({ columnResizeMode, header, table }) => {
    return (
        <th
            {...{
                key: header.id,
                colSpan: header.colSpan,
                tyle: {
                    width: header.getSize(),
                }
            }}
            className="relative"
        >
            <div className="group flex flex-row justify-start items-center">

                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}

            </div>
        </th>
    )
}

export default ColumnHeaderBasic;