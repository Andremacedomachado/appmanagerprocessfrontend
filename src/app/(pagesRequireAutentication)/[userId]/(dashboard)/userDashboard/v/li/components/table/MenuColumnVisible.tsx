'use client'

import { Table } from "@tanstack/react-table";
import { ActivityInfoPart } from "./DraggableColumnHeader";

export interface MenuColumnVisibleProps {
    table: Table<ActivityInfoPart>
    show: boolean
}

const MenuColumnVisible: React.FC<MenuColumnVisibleProps> = ({ table, show }) => {
    return (
        <div className={`flex flex-col`}>
            <div className="px-1 border-b border-black">
                <label>
                    <input
                        {...{
                            type: 'checkbox',
                            checked: table.getIsAllColumnsVisible(),
                            onChange: table.getToggleAllColumnsVisibilityHandler(),
                        }}
                    />{' '}
                    Toggle All
                </label>
            </div>
            {table.getAllLeafColumns().map(column => (

                !(column.id == "action" || column.id == "title") ?
                    <div key={column.id} className="px-1">

                        <label>
                            <input
                                {...{
                                    type: 'checkbox',
                                    checked: column.getIsVisible(),
                                    onChange: column.getToggleVisibilityHandler(),
                                }}
                            />{' '}
                            {column.id}
                        </label>
                    </div> :
                    <></>
            )
            )}
        </div>
    )
}

export default MenuColumnVisible;