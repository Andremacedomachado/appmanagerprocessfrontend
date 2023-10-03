'use client'

import { Header, Table, flexRender } from "@tanstack/react-table";
import { ActivityInfoPart } from "./DraggableColumnHeader";

interface ColumnHeaderTaskProps {
    table: Table<ActivityInfoPart>,
    header: Header<ActivityInfoPart, unknown>
}

const ColumnHeaderTask: React.FC<ColumnHeaderTaskProps> = ({ header, table }) => {
    return (
        <th
            {...{
                colSpan: header.colSpan,
                tyle: {
                    width: header.getSize(),
                }
            }}
        >

            <div className="group flex flex-row justify-center items-center px-1">
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
            </div>
        </th>
    )
}
export default ColumnHeaderTask;