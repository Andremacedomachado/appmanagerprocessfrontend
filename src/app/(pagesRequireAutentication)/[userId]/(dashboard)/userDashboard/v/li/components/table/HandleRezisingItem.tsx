'use client'

import { ColumnResizeMode, Header, Table } from "@tanstack/react-table"
import { ActivityInfoPart } from "./DraggableColumnHeader"

export interface HandleRezisingItemProps {
    table: Table<ActivityInfoPart>,
    header: Header<ActivityInfoPart, unknown>
    columnResizeMode: ColumnResizeMode
    position: 'right' | 'left'
}

const HandleRezisingItem: React.FC<HandleRezisingItemProps> = ({ header, table, columnResizeMode, position }) => {
    return (
        <div
            {...{
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
                style: {
                    transform:
                        columnResizeMode === 'onEnd' &&
                            header.column.getIsResizing()
                            ? `translateX(${table.getState().columnSizingInfo.deltaOffset
                            }px)
                            bg-orange-400
                            `
                            : '',
                },
            }}

            className={`
                group-hover:bg-zinc-700
                absolute
                top-0
                ${position == "right" ? "right-0" : "left-0"}
                w-1
                h-full
                rounded-md
                ${header.column.getIsResizing() ? ' bg-orange-400' : ''}
                hover:cursor-col-resize
            `
            }
        />
    )
}

export default HandleRezisingItem;