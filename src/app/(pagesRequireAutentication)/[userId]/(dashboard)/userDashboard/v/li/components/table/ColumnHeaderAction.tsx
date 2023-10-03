'use client'

import { Header, Table, flexRender } from "@tanstack/react-table"
import { ActivityInfoPart } from "./DraggableColumnHeader"
import MenuColumnVisible from "./MenuColumnVisible"
import { useState } from "react"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/app/components/popover/Popover"
import PopoutMenuAction from "@/app/components/popover/PopoutMenuAction"

interface ColumnHeaderActionProps {
    table: Table<ActivityInfoPart>,
    header: Header<ActivityInfoPart, unknown>
}

const ColumnHeaderAction: React.FC<ColumnHeaderActionProps> = ({ header, table }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <th
            {...{
                colSpan: header.colSpan,
                tyle: {
                    width: header.getSize().toFixed,
                }
            }}
            className="relative"
        >

            <PopoutMenuAction
                contentTrigger={header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                menuNode={<MenuColumnVisible table={table} show={isOpen} />}
                placement="left"

            />

        </th>
    )
}

export default ColumnHeaderAction;