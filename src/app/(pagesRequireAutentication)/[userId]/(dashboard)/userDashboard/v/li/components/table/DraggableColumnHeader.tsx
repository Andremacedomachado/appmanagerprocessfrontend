'use client'
import { ActivityInfo } from "@/app/types/CollectionActivityTree"
import { Column, ColumnOrderState, ColumnResizeMode, Header, Table, flexRender } from "@tanstack/react-table"
import { useDrag, useDrop } from "react-dnd"
import ButtonItemFilterMenu from "../collectionListTask/menuItem/ButtonItemFilterMenu"
import { SlOptionsVertical } from "react-icons/sl"
import HandleRezisingItem from "./HandleRezisingItem"
import ButtonItemSortMenu from "../collectionListTask/menuItem/ButtonItemSortMenu"

export type ActivityInfoPart = Omit<ActivityInfo, "description" | "type_node" | "created_at" | "updated_at" | "start_date" | "due_date">


const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[]
): ColumnOrderState => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
    )
    return [...columnOrder]
}

const DraggableColumnHeader: React.FC<{
    header: Header<ActivityInfoPart, unknown>
    table: Table<ActivityInfoPart>
    columnResizeMode: ColumnResizeMode
}> = ({ header, table, columnResizeMode }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn: Column<ActivityInfoPart>) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        },
    })

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
    })
    return (
        <th
            ref={dropRef}
            colSpan={header.colSpan}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="relative px-1"
        >
            <div ref={previewRef} className="group flex flex-row justify-start items-center">
                <HandleRezisingItem
                    header={header}
                    table={table}
                    columnResizeMode={columnResizeMode}
                    position="left"
                />
                <div ref={dragRef} className="flex flex-col justify-center items-center text-transparent bg-transparent group-hover:text-zinc-700">

                    <ButtonItemFilterMenu icon={SlOptionsVertical} label="" onClickClosed={() => { }}></ButtonItemFilterMenu>
                </div>
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}

                <ButtonItemSortMenu active />
                <HandleRezisingItem
                    header={header}
                    table={table}
                    columnResizeMode={columnResizeMode}
                    position="right"
                />
            </div>
        </th>
    )
}

export default DraggableColumnHeader;